import Bowser from 'bowser';
import debug from 'debug';
import React, {
	FC,
	MutableRefObject,
	RefObject,
	createContext,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
} from 'react';
import type ReactPlayer from 'react-player';
import useFullscreen from 'react-use/lib/useFullscreen';
import usePreviousDistinct from 'react-use/lib/usePreviousDistinct';
import useToggle from 'react-use/lib/useToggle';

import { videoActions } from '../store/actions';
import { videoGetters } from '../store/getters';
import { useStateReducer } from '../store/reducer';
import {
	ControlsConfig,
	FullscreenApi,
	Highlight,
	ReactPlayerProps,
	VideoActionKeys,
	VideoActions,
	VideoApi,
	VideoProviderProps,
	VideoState,
} from '../types';
import { getVideoEl } from '../utils';
import { blend } from '../utils/colors';

import { PROVIDER_INITIAL_STATE } from './constants';
import { useVideoDebug } from './useVideoDebug';

const DEBUG_PREFIX = 'VideoProvider';
const log = debug(DEBUG_PREFIX);
export interface VideoContext {
	/** A collection of getters, setters, emitters for the video  */
	api?: VideoApi;
	/** Last activity ref(triggered by mouse move) */
	lastActivityRef?: MutableRefObject<number | undefined>;
	/** Setter for the lastActivityRef */
	markActivity?: VoidFunction;
	/** Configuration that enables/disables some parts of the overlay on top of the video player */
	controlsConfig?: ControlsConfig;
	/** Props that will be provided to ReactPlayer */
	reactPlayerProps?: ReactPlayerProps;
	/** Video state */
	state?: VideoState;
	/** Instance ref for the ReactPlayer */
	reactPlayerRef?: RefObject<ReactPlayer>;
	/** Ref to the container of the <video>. Used mostly for fullscreen */
	videoContainerRef: RefObject<HTMLDivElement>;
	/** Fullscreen API getter and setters */
	fullScreenApi?: FullscreenApi;
	/** Blending colors for highlights presented in `<ProgressBar` */
	getHighlightColorBlended?: VideoProviderProps['getHighlightColorBlended'];
	/** Blending colors for highlights presented in `<ProgressBar` */
	onContext?: (context: VideoContext) => void;
	highlights?: Highlight[];
}

/** A React Context - to share video api through components */
export const VideoContext = createContext<VideoContext | null>(null);

/** A provider that should wrap VideoContainer for context consuming */
export const VideoProvider: FC<VideoProviderProps> = ({
	initialState: firstInitialState = PROVIDER_INITIAL_STATE,
	children,
	controlsConfig,
	persistedState,
	getHighlightColorBlended = blend,
	onContext,
	highlights,
}) => {
	const {
		state,
		dispatch,
		reactPlayerRef,
		initialState,
		lastActivityRef,
		markActivity,
		videoContainerRef,
	} = useStateReducer({
		firstInitialState,
		persistedState,
	});
	const readyFiredRef = useRef(false);
	const hasAutoplayedRef = useRef(false);
	const [showFullscreen, toggleFullscreen] = useToggle(false);
	const isFullscreen = useFullscreen(videoContainerRef, showFullscreen, {
		onClose: () => toggleFullscreen(false),
	});

	const updateContextValue = useCallback(
		(currentValue?: Partial<VideoContext>): VideoContext => {
			const ctx = currentValue || {};
			ctx.reactPlayerRef = reactPlayerRef;

			const api: VideoApi = (ctx.api = ctx.api || {
				addEventListener: state.emitter?.on,
				removeEventListener: state.emitter?.off,
			});

			for (const event in videoActions) {
				api[event] = (payload: Parameters<VideoActions[VideoActionKeys]>[1]) =>
					dispatch({
						// for...in loop is badly TS and needs here a Typeguard that can be too much,
						// but we know already that all values are VideoActionsKey.
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						type: event as any,
						payload,
					});
			}

			for (const key in videoGetters) {
				api[key] = () => videoGetters[key](state);
			}
			ctx.videoContainerRef = videoContainerRef;
			ctx.lastActivityRef = lastActivityRef;
			ctx.markActivity = markActivity;
			ctx.getHighlightColorBlended = getHighlightColorBlended;
			ctx.fullScreenApi = {
				isFullscreen,
				enterFullscreen: () => toggleFullscreen(true),
				exitFullscreen: () => toggleFullscreen(false),
				toggleFullscreen,
			};
			ctx.state = state;
			ctx.highlights = highlights;
			ctx.controlsConfig = controlsConfig;
			ctx.reactPlayerProps = {
				autoPlay: Boolean(initialState.playing),
				playsinline: true,
				playbackRate: state.playbackRate,
				playing: state.playing,
				muted: state.muted,
				volume: state.volume,
				ref: reactPlayerRef,
				onReady: () => {
					state.emitter?.emit('ready');

					if (!readyFiredRef?.current) {
						state.emitter?.emit('firstReady');
						readyFiredRef.current = true;
					}
					api?._setReady?.(undefined);
				},
				onEnded: () => state.emitter?.emit('ended'),
				onDuration: duration => api?.setDuration?.(duration),
				onProgress: ({ playedSeconds }) =>
					api?._handleProgress?.(playedSeconds),
			};
			return ctx as VideoContext;
		},
		// Creating a new lazy state function - to renew state should ne only:
		// we change controlsConfig(responsible to display video controls),
		// dispatch - if the dispatcher is changed,
		// state changes(user triggered it, or by events listeners),
		// initialState.playing - to trigger autoplay,
		// markActivity + lastActivityRef - setter and it's value to detect user interactions with the player(mouse move),
		// reactPlayerRef - ReactPlayer instance ref,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			highlights,
			controlsConfig,
			dispatch,
			initialState.playing,
			markActivity,
			state,
			reactPlayerRef,
			lastActivityRef,
		],
	);

	/**
	 * Creating a lazy state:
	 * Details here:
	 * https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates
	 */
	const [videoContext, setVideoContext] =
		React.useState<VideoContext>(updateContextValue);

	// Force a ready event for safari when the video has been loaded
	React.useEffect(() => {
		const browser = Bowser.getParser(window.navigator.userAgent);

		if (!browser.satisfies({ safari: '>1' })) {
			return;
		}
		const videoEl = reactPlayerRef?.current?.getInternalPlayer();
		if (videoEl) {
			videoEl.load();
		}
	});

	const onReadyToPlay = useCallback(() => {
		const videoEl = reactPlayerRef?.current?.getInternalPlayer();
		state?.emitter?.off('seeked', onReadyToPlay);
		videoEl
			?.play()
			.then(() => state.emitter?.emit('autoplayStart'))
			.catch((error: unknown) => {
				console.info('Player failed to autoplay', error);
				dispatch({ type: 'pause' });
			});
	}, [dispatch, state.emitter, reactPlayerRef]);

	// Play is a async operation. so when the player is ready to autoplay video,
	// then we must be sure that first of all we solve setCurrentTime and after that the play method.
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
	const onReadyToSeek = useCallback(() => {
		state.emitter?.on('seeked', onReadyToPlay);
		state.emitter?.off('ready', onReadyToSeek);
		window.setTimeout(() => {
			videoContext?.api?.setCurrentTime?.(0);
		}, 0);
	}, [state.emitter, onReadyToPlay, videoContext]);

	useLayoutEffect(() => {
		if (
			!hasAutoplayedRef.current &&
			reactPlayerRef?.current &&
			initialState?.playing
		) {
			const el = getVideoEl(state);
			if (el && el.parentElement) {
				el.parentElement?.focus();
			}
			const videoEl = reactPlayerRef.current?.getInternalPlayer();
			if (!videoEl) return;

			state.emitter?.on('ready', onReadyToSeek);
		}
		hasAutoplayedRef.current = true;
	}, [initialState, onReadyToSeek, reactPlayerRef, state]);

	useVideoDebug({ reactPlayerRef });

	const prevState = usePreviousDistinct(state);

	useEffect(() => {
		let newValue = updateContextValue(videoContext);

		// If state changed, create a new context object so that components re-render.
		if (state !== prevState) {
			newValue = { ...newValue };
		}
		setVideoContext(() => newValue);
		if (onContext) {
			log('onContext()', newValue);
			onContext(newValue);
		}
		// VideoContext should only be refreshed when state changes(user triggered it, or by events listeners),
		// on changing configuration for controlsConfig(responsible to display video controls)
		// or we change initialState to avoid rerenders
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, dispatch, controlsConfig, initialState, onContext]);

	return (
		<VideoContext.Provider value={videoContext}>
			{children}
		</VideoContext.Provider>
	);
};

VideoProvider.displayName = 'VideoProvider';
