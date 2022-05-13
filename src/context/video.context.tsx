/* eslint-disable max-lines */
import React, { createContext, FC, MutableRefObject, RefObject } from 'react';
import Bowser from 'bowser';
import {
	ControlsConfig,
	ReactPlayerProps,
	VideoActionKeys,
	VideoApi,
	VideoProviderProps,
	VideoState,
} from '../types';

import { videoGetters } from '../store/getters';
import { Size, useSize } from '../hooks';
import { PROVIDER_FIRST_INITIAL_STATE } from './context.constants';
import { videoActions } from '../store/actions';
import usePreviousDistinct from '../hooks/use-previous-distinct';
import { useStateReducer } from '../store/reducer';

export interface VideoContext {
	api?: VideoApi;
	keyboardTargetRef?: RefObject<any> | null;
	lastActivityRef?: MutableRefObject<number | undefined>;
	markActivity?: VoidFunction;
	controlsConfig?: ControlsConfig;
	reactPlayerProps?: ReactPlayerProps;
	size?: Size;
	state?: VideoState;
	videoRef?: RefObject<any>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VideoContext = createContext<VideoContext | null>(null);

export const VideoProvider: FC<VideoProviderProps> = ({
	initialState: firstInitialState = PROVIDER_FIRST_INITIAL_STATE,
	children,
	controlsConfig,
}) => {
	const { state, dispatch, videoRef, initialState } = useStateReducer({
		firstInitialState,
	});
	const prevState = usePreviousDistinct(state);
	const readyFiredRef = React.useRef(false);
	const [hasAutoplayed, setAutoplayed] = React.useState(false);
	const videoSize = useSize(videoRef.current?.getInternalPlayer());

	// Store the user's last "activity" (including mousemove over player) within a ref,
	// so that state re-renders are not triggered every mousemove.
	const lastActivityRef = React.useRef<number>();
	const markActivity = React.useCallback(() => {
		if (lastActivityRef) lastActivityRef.current = Date.now();
	}, [lastActivityRef]);

	const { oneTimeStopPoint } = state;
	React.useEffect(() => {
		// When one time stop point is set, start checking time every frame
		// so we can stop video EXACTLY when user hits it.
		if (!oneTimeStopPoint) return;

		let frameId: number;
		(function tick() {
			const el = videoRef.current?.getInternalPlayer();

			// Stop within two frames of end of word (34ms)
			if (el?.currentTime >= oneTimeStopPoint - 34 / 1000) {
				el.currentTime = oneTimeStopPoint;
				dispatch({
					type: '_handleProgress',
					payload: el.currentTime,
				});
			}
			frameId = window.requestAnimationFrame(tick);
		})();
		return () => window.cancelAnimationFrame(frameId);
	}, [oneTimeStopPoint, dispatch, videoRef]);

	/**
	 * Creating a lazy state:
	 * Details here:
	 * https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates
	 */
	const [videoContext, setVideoContext] =
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		React.useState<VideoContext>(updateContextValue);

	// Force a ready event for safari when the video has been loaded
	React.useEffect(() => {
		const browser = Bowser.getParser(window.navigator.userAgent);

		if (!browser.satisfies({ safari: '*' })) return;
		const videoEl = videoRef.current?.getInternalPlayer();
		if (videoEl) videoEl.load();
	}, [videoRef]);

	// Autoplay @edwardbaeg
	// 1. Load the video player and video
	// 2. After 'ready' event, seek player to startTime
	// 3. After 'seeked' event, start playback
	// NOTE: For this to work in Safari, the video must start muted
	// NOTE: This does not set hasPlayedOrSeeked in state
	const onReadyToPlay = React.useCallback(() => {
		const videoEl = videoRef.current?.getInternalPlayer();
		state?.emitter?.off('seeked', onReadyToPlay);
		videoEl
			.play()
			.then(() => state.emitter?.emit('autoplayStart'))
			.catch((error: unknown) => {
				console.info('Player failed to autoplay', error);
				dispatch({ type: 'pause' });
			});
	}, [dispatch, state.emitter, videoRef]);

	const onReadyToSeek = React.useCallback(() => {
		state.emitter?.on('seeked', onReadyToPlay);
		state.emitter?.off('ready', onReadyToSeek);
		window.setTimeout(() => {
			videoContext?.api?.setCurrentTime?.(0);
		}, 0);
	}, [state.emitter, onReadyToPlay, videoContext]);

	React.useLayoutEffect(() => {
		if (!hasAutoplayed && videoRef.current && initialState?.playing) {
			if (videoRef.current?.base?.parentNode) {
				videoRef.current.base.parentNode.focus();
			}
			const videoEl = videoRef.current?.getInternalPlayer();
			if (!videoEl) return;

			state.emitter?.on('ready', onReadyToSeek);
		}
		setAutoplayed(true);
	}, [
		initialState,
		videoRef,
		hasAutoplayed,
		setAutoplayed,
		state.emitter,
		state.startTime,
		onReadyToSeek,
	]);

	/* eslint-disable react-hooks/exhaustive-deps */
	React.useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		let newValue = updateContextValue(videoContext);

		// If state changed, create a new context object so that components re-render.
		if (state !== prevState) {
			newValue = { ...newValue };
		}
		setVideoContext(newValue);
	}, [state, dispatch, videoRef, controlsConfig, videoSize, initialState]);

	function updateContextValue(currentValue?: VideoContext) {
		const ctx = currentValue || {};
		ctx.videoRef = videoRef;

		const api: VideoApi = (ctx.api = ctx.api || {
			addEventListener: state.emitter?.on,
			removeEventListener: state.emitter?.off,
		});
		for (const event in videoActions) {
			api[event] = (payload: any) =>
				dispatch({ type: event as VideoActionKeys, payload });
		}

		for (const key in videoGetters) {
			api[key] = () => videoGetters[key](state);
		}

		Object.keys(videoGetters).reduce((acc, key) => {
			acc[key] = 'redacted';
			return acc;
		}, {});

		ctx.lastActivityRef = lastActivityRef;
		ctx.markActivity = markActivity;
		ctx.state = state;
		ctx.controlsConfig = controlsConfig;
		ctx.size = videoSize;
		ctx.reactPlayerProps = {
			autoPlay: !!(initialState && initialState.playing),
			playsinline: true,
			playbackRate: state.playbackRate,
			playing: state.playing,
			muted: state.muted,
			volume: state.volume,
			ref: videoRef,
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
			onProgress: ({ playedSeconds }) => api?._handleProgress?.(playedSeconds),
		};

		return ctx;
	}

	return (
		<VideoContext.Provider value={videoContext}>
			{children}
		</VideoContext.Provider>
	);
};
