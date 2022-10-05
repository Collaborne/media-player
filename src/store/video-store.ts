import mitt from 'mitt';
import { MutableRefObject, RefObject } from 'react';
import type ReactPlayer from 'react-player';
import create, { StateCreator } from 'zustand';

import { CorePlayerInitialState } from '../components';
import { Highlight, VideoEvents, VideoState } from '../types';
import { getVideoEl } from '../utils';
import { BlendColors } from '../utils/colors';

export interface VideoSettersSlice {
	play: () => void;
	pause: () => void;
	mute: () => void;
	unmute: () => void;
	setPlaybackRate: (playbackRate: number) => void;
	setVolume: (volume: number) => void;
	setCurrentTime: (relativeSeconds: number) => void;
	setHasPipTriggeredByClick: (hasPipTriggeredByClick: boolean) => void;
	setStartTime: (startTime: number) => void;
	setEndTime: (endTime: number) => void;
	setDuration: (duration: number) => void;
	requestPip: () => void;
	exitPip: () => void;
	setShowControls: (isUpdated: boolean) => void;
	playAnimationStart: (hasStarted: boolean) => void;
	pauseAnimationStart: (hasPaused: boolean) => void;
	setShowPipControls: (isUpdated: boolean) => void;
	// Private Methods
	_setReady: () => void;
	_handleProgress: (currentTime: number) => void;
}

interface VideoStoreExternalProps {
	reactPlayerRef: RefObject<ReactPlayer>;
	playPromiseRef: MutableRefObject<Promise<void> | undefined>;
	videoContainerRef: RefObject<HTMLDivElement>;
	highlights?: Highlight[];
	initialState: CorePlayerInitialState;
	getHighlightColorBlended?: BlendColors;
}

type CreateExternal = (
	args: VideoStoreExternalProps,
) => StateCreator<VideoState & VideoSettersSlice, [], [], VideoState>;

export const createVideoStateSlice: CreateExternal =
	(externalProps: VideoStoreExternalProps) => () => ({
		...externalProps,
		currentTime: 0,
		currentRelativeTime: 0,
		playbackRate: 1,
		startTime: 0,
		endTime: 0,
		duration: 0,
		volume: 1,
		emitter: mitt<VideoEvents>(),
		ready: false,
		playing: false,
		muted: false,
		fullscreen: false,
		hasPlayedOrSeeked: false,
		pip: false,
		hasPipTriggeredByClick: true,
		showControls: true,
		showPipControls: false,
		didPlayAnimationStart: false,
		didPauseAnimationStart: false,
	});

export const createVideoSetters: StateCreator<
	VideoState & VideoSettersSlice,
	[],
	[],
	VideoSettersSlice
> = set => ({
	play: () =>
		set(state => {
			state.emitter.emit('play');
			const mediaEl = getVideoEl(state);
			if (mediaEl) {
				state.playPromiseRef.current = mediaEl.play();
			}
			if (
				mediaEl?.currentTime &&
				(mediaEl.currentTime >= state.endTime ||
					mediaEl.currentTime < state.startTime)
			) {
				mediaEl.currentTime = state.startTime;
				return {
					playing: true,
					currentTime: state.startTime,
					hasPlayedOrSeeked: true,
				};
			}

			return { playing: true, hasPlayedOrSeeked: true };
		}),
	pause: () =>
		set(state => {
			state.emitter.emit('pause');
			const video = getVideoEl(state);
			if (video && state.playPromiseRef.current) {
				void state.playPromiseRef.current.then(() => video.pause());
			}
			return { playing: false };
		}),
	setVolume: (volume: number) =>
		set({ volume: Math.min(Math.max(volume, 0), 1) }),
	setPlaybackRate: (playbackRate: number) =>
		set(state => {
			state.emitter.emit('setPlaybackRate', { playbackRate });
			return { playbackRate };
		}),
	unmute: () =>
		set(state => {
			state.emitter.emit('unnmute');
			return {
				muted: false,
			};
		}),
	mute: () =>
		set(state => {
			state.emitter.emit('mute');
			return {
				muted: true,
			};
		}),
	setShowControls: (isUpdated: boolean) =>
		set(state => {
			state.emitter.emit('showControls', { isUpdated });
			return { showControls: isUpdated };
		}),
	pauseAnimationStart: (hasPaused: boolean) =>
		set({
			didPauseAnimationStart: hasPaused,
		}),
	playAnimationStart: (hasPlayed: boolean) =>
		set({
			didPlayAnimationStart: hasPlayed,
		}),
	setShowPipControls: (isUpdated: boolean) =>
		set(state => {
			state.emitter.emit('showPipControls', { isUpdated });
			return { showPipControls: isUpdated };
		}),

	requestPip: () =>
		set(state => {
			state.emitter.emit('pipEnter');
			return {
				pip: true,
			};
		}),
	exitPip: () =>
		set(state => {
			state.emitter.emit('pipExit');
			return { pip: false };
		}),
	setDuration: (duration: number) =>
		set(state => {
			state.emitter.emit('durationchange', { duration });
			if (state.duration === duration) {
				return state;
			}
			return {
				duration,
				endTime: state.startTime + duration,
				currentRelativeTime: 0,
				startTime: 0,
				currentTime: 0,
			};
		}),

	setStartTime: (startTime: number) => set({ startTime }),
	setEndTime: (endTime: number) => set({ endTime }),
	setHasPipTriggeredByClick: (hasPipTriggeredByClick: boolean) =>
		set({
			hasPipTriggeredByClick,
		}),
	setCurrentTime: (relativeSeconds: number) =>
		set(state => {
			relativeSeconds = Math.min(state.duration, Math.max(0, relativeSeconds));
			const videoEl = getVideoEl(state);
			if (videoEl) {
				const diffMs = (relativeSeconds - videoEl.currentTime) * 1000;
				videoEl.currentTime = state.startTime + relativeSeconds;
				state.emitter.emit('seeked', { diffMs });
				state.emitter.emit('timeupdate', {
					seconds: relativeSeconds,
					duration: state.duration,
				});
			}

			return {
				currentTime: state.startTime + relativeSeconds,
				hasPlayedOrSeeked: true,
			};
		}),

	// Private Actions
	_setReady: () =>
		set(state => {
			// In safari, any seeking that happens before a video is ready is canceled as soon
			// as the video loads.
			// Counteract this by re-seeking to state time on the first ready.
			const videoEl = getVideoEl(state);
			if (
				videoEl &&
				!state.ready &&
				videoEl.currentTime !== state.currentTime
			) {
				videoEl.currentTime = state.currentTime;
			}
			return { ready: true };
		}),

	_handleProgress: (currentTime: number) =>
		set(state => {
			const currentRelativeTime = Math.min(
				state.endTime,
				Math.max(0, currentTime - state.startTime),
			);

			if (state.playing) {
				state.emitter.emit('timeupdate', {
					seconds: currentRelativeTime,
					duration: state.duration,
				});
				state.emitter.emit('progress', {
					seconds: currentRelativeTime,
					duration: state.duration,
				});
			}
			if (currentTime >= state.endTime) {
				state.emitter.emit('end');
			}
			let { playing } = state;

			if (currentTime >= state.startTime + state.duration) {
				playing = false;
			}

			return {
				currentTime,
				playing,
			};
		}),
});

export const createVideoStore = (externalProps: VideoStoreExternalProps) =>
	create<VideoState & VideoSettersSlice>()((...a) => ({
		...createVideoSetters(...a),
		...createVideoStateSlice(externalProps)(...a),
	}));
