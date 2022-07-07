import Bowser from 'bowser';
import React, {
	FC,
	MutableRefObject,
	RefObject,
	createContext,
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
} from 'react';
import type ReactPlayer from 'react-player';
import screenfull from 'screenfull';

import usePreviousDistinct from '../hooks/use-previous-distinct';
import { videoActions } from '../store/actions';
import { videoGetters } from '../store/getters';
import { useStateReducer } from '../store/reducer';
import {
	ControlsConfig,
	ReactPlayerProps,
	VideoActionKeys,
	VideoActions,
	VideoApi,
	VideoProviderProps,
	VideoState,
} from '../types';
import { getVideoEl } from '../utils';

import { PROVIDER_INITIAL_STATE } from './constants';

export interface VideoContext {
	api?: VideoApi;
	lastActivityRef?: MutableRefObject<number | undefined>;
	markActivity?: VoidFunction;
	controlsConfig?: ControlsConfig;
	reactPlayerProps?: ReactPlayerProps;
	state?: VideoState;
	videoRef?: RefObject<ReactPlayer>;
	videoContainerRef?: RefObject<HTMLDivElement>;
}

const EMPTY_CONST = 'EMPTY_CONST';
export const VideoContext = createContext<VideoContext | null>(null);

export const VideoProvider: FC<VideoProviderProps> = memo(
	({
		initialState: firstInitialState = PROVIDER_INITIAL_STATE,
		children,
		controlsConfig,
		persistedState,
	}) => {
		const {
			state,
			dispatch,
			videoRef,
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

		const updateContextValue = useCallback(
			(currentValue?: Partial<VideoContext>) => {
				const ctx = currentValue || {};
				ctx.videoRef = videoRef;

				const api: VideoApi = (ctx.api = ctx.api || {
					addEventListener: state.emitter?.on,
					removeEventListener: state.emitter?.off,
				});

				for (const event in videoActions) {
					api[event] = (
						payload: Parameters<VideoActions[VideoActionKeys]>[1],
					) =>
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
				ctx.state = state;
				ctx.controlsConfig = controlsConfig;
				ctx.reactPlayerProps = {
					autoPlay: Boolean(initialState.playing),
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
					onProgress: ({ playedSeconds }) =>
						api?._handleProgress?.(playedSeconds),
				};

				return ctx;
			},
			[
				controlsConfig,
				dispatch,
				initialState.playing,
				markActivity,
				state,
				videoRef,
				lastActivityRef,
			],
		);

		/**
		 * Creating a lazy state:
		 * Details here:
		 * https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates
		 */
		const [videoContext, setVideoContext] =
			React.useState<Partial<VideoContext>>(updateContextValue);

		// Force a ready event for safari when the video has been loaded
		React.useEffect(() => {
			const browser = Bowser.getParser(window.navigator.userAgent);

			if (!browser.satisfies({ safari: '*' })) return;
			const videoEl = videoRef?.current?.getInternalPlayer();
			if (videoEl) videoEl.load();
		});

		const onReadyToPlay = useCallback(() => {
			const videoEl = videoRef?.current?.getInternalPlayer();
			state?.emitter?.off('seeked', onReadyToPlay);
			videoEl
				?.play()
				.then(() => state.emitter?.emit('autoplayStart'))
				.catch((error: unknown) => {
					console.info('Player failed to autoplay', error);
					dispatch({ type: 'pause' });
				});
		}, [dispatch, state.emitter, videoRef]);

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
				videoRef?.current &&
				initialState?.playing
			) {
				const el = getVideoEl(state);
				if (el && el.parentElement) {
					el.parentElement?.focus();
				}
				const videoEl = videoRef.current?.getInternalPlayer();
				if (!videoEl) return;

				state.emitter?.on('ready', onReadyToSeek);
			}
			hasAutoplayedRef.current = true;
		}, [initialState, onReadyToSeek, videoRef, state]);

		const prevState = usePreviousDistinct(state);

		useEffect(() => {
			let newValue = updateContextValue(videoContext);

			// If state changed, create a new context object so that components re-render.
			if (state !== prevState) {
				newValue = { ...newValue };
			}
			setVideoContext(() => newValue);
		}, [state, controlsConfig, initialState]);

		React.useEffect(() => {
			const onFullscreenChange = () => {
				const isFullscreen =
					screenfull.isFullscreen &&
					screenfull.element === videoContainerRef.current;

				dispatch({
					type: 'setFullscreen',
					payload: isFullscreen,
				});
			};

			if (screenfull.isEnabled) {
				screenfull.on('change', onFullscreenChange);
			}
			return () => {
				if (screenfull.isEnabled) {
					screenfull.off('change', onFullscreenChange);
				}
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [EMPTY_CONST]);

		return (
			<VideoContext.Provider value={videoContext}>
				{children}
			</VideoContext.Provider>
		);
	},
);

VideoProvider.displayName = 'VideoProvider';
