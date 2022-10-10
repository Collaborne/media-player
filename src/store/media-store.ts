import mitt from 'mitt';
import screenfull from 'screenfull';
import create, { StateCreator } from 'zustand';

import {
	MediaEvents,
	MediaState,
	MediaStateExternalInitializers,
	MediaStateSetters,
} from '../types';
import { getMediaEl } from '../utils';

export type MediaStore = MediaState &
	MediaStateSetters &
	MediaStateExternalInitializers;

type CreatePropsSlice = (
	args: MediaStateExternalInitializers,
) => StateCreator<MediaStore, [], [], MediaStateExternalInitializers>;

export const createPropsSlice: CreatePropsSlice =
	(externalProps: MediaStateExternalInitializers) => () => ({
		...externalProps,
	});

export const createDefaultMediaSlice: StateCreator<
	MediaStore,
	[],
	[],
	MediaState
> = () => ({
	currentTime: 0,
	currentRelativeTime: 0,
	playbackRate: 1,
	startTime: 0,
	endTime: 0,
	duration: 0,
	volume: 1,
	emitter: mitt<MediaEvents>(),
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
	isFullscreen: false,
});

export const createSettersSlice: StateCreator<
	MediaState & MediaStateSetters & MediaStateExternalInitializers,
	[],
	[],
	MediaStateSetters
> = (set, get) => ({
	requestFullscreen: () =>
		set(state => {
			const mediaEl = getMediaEl(state);
			if (!mediaEl) {
				return state;
			}
			if (state.pip) {
				state.exitPip();
			}
			state.emitter.emit('fullscreenEnter');
			if (screenfull.isEnabled && state.mediaContainerRef.current) {
				void screenfull.request(state.mediaContainerRef.current);
			}
			return { isFullscreen: true };
		}),
	exitFullscreen: () =>
		set(state => {
			state.emitter.emit('fullscreenExit');
			if (screenfull.isEnabled) {
				void screenfull.exit();
			}
			return { isFullscreen: false };
		}),
	getListener: () => ({
		addEventListener: get().emitter.on,
		removeEventListener: get().emitter.off,
	}),
	play: () =>
		set(state => {
			state.emitter.emit('play');
			const mediaEl = getMediaEl(state);
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
			const media = getMediaEl(state);
			if (media && state.playPromiseRef.current) {
				void state.playPromiseRef.current.then(() => media.pause());
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
	setShowPipControls: (isUpdated: boolean) =>
		set(state => {
			state.emitter.emit('showPipControls', { isUpdated });
			return { showPipControls: isUpdated };
		}),

	requestPip: () =>
		set(state => {
			if (state.isFullscreen) {
				state.exitFullscreen();
			}
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
			const mediaEl = getMediaEl(state);
			if (mediaEl) {
				const diffMs = (relativeSeconds - mediaEl.currentTime) * 1000;
				mediaEl.currentTime = state.startTime + relativeSeconds;
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
			// In safari, any seeking that happens before a media is ready is canceled as soon
			// as the media loads.
			// Counteract this by re-seeking to state time on the first ready.
			const mediaEl = getMediaEl(state);
			if (
				mediaEl &&
				!state.ready &&
				mediaEl.currentTime !== state.currentTime
			) {
				mediaEl.currentTime = state.currentTime;
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

type onStoreUpdate = <T>(
	fn?: (store: T) => void,
) => (initializer: StateCreator<T, [], [], T>) => StateCreator<T, [], [], T>;

const onStoreUpdateMiddleware: onStoreUpdate =
	fn => config => (set, get, api, info) =>
		config(
			state => {
				set(state);
				fn?.(get());
			},
			get,
			api,
			info,
		);

export const createMediaStore = ({
	onStoreUpdate,
	...externalProps
}: MediaStateExternalInitializers) =>
	create<MediaStore>()(
		onStoreUpdateMiddleware(onStoreUpdate)((...a) => ({
			...createDefaultMediaSlice(...a),
			...createSettersSlice(...a),
			...createPropsSlice(externalProps)(...a),
		})),
	);
