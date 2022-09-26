/**
 * Context Provider for playing videos
 */

import Bowser from 'bowser';
import debug from 'debug';
import React, {
	ReactNode,
	FC,
	useRef,
	useCallback,
	useLayoutEffect,
	useEffect,
} from 'react';
import { useToggle, useFullscreen, usePreviousDistinct } from 'react-use';

import { CorePlayerInitialState } from '../components/core-player/types';
import { videoActions } from '../store/actions';
import { videoGetters } from '../store/getters';
import { useStateReducer } from '../store/reducer';
import {
	VideoState,
	Highlight,
	VideoApi,
	VideoActions,
	VideoActionKeys,
} from '../types';
import { getVideoEl } from '../utils';
import { BlendColors } from '../utils/colors';

import { useVideoDebug } from './useVideoDebug';
import { VideoContext } from './video';

const DEBUG_PREFIX = 'VideoProvider';
const log = debug(DEBUG_PREFIX);

export interface VideoProviderProps {
	/** Provider's initialization state */
	initialState: CorePlayerInitialState;
	/** State that needs to be stored in localStorage */
	persistedState?: VideoState;
	/** Blending colors for highlights presented in `<ProgressBar>` */
	getHighlightColorBlended: BlendColors;
	/** A callback that can updates VideoContext outside of the VideoProvider */
	onContext?: (context: VideoContext) => void;
	highlights?: Highlight[];
	/** ReactNode that will consume the context */
	children: ReactNode;
}

/** A provider that should wrap VideoContainer for context consuming */
export const VideoProvider: FC<VideoProviderProps> = ({
	initialState: firstInitialState,
	children,
	persistedState,
	getHighlightColorBlended,
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
				addEventListener: state.emitter.on,
				removeEventListener: state.emitter.off,
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
		// dispatch - if the dispatcher is changed,
		// state changes(user triggered it, or by events listeners),
		// initialState.playing - to trigger autoplay,
		// markActivity + lastActivityRef - setter and it's value to detect user interactions with the player(mouse move),
		// reactPlayerRef - ReactPlayer instance ref,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			highlights,
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
	}, [state, dispatch, initialState, onContext]);

	return (
		<VideoContext.Provider value={videoContext}>
			{children}
		</VideoContext.Provider>
	);
};

VideoProvider.displayName = 'VideoProvider';
