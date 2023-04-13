/* eslint-disable max-lines */
import screenfull from 'screenfull';
import { create, StateCreator } from 'zustand';

import {
	MediaState,
	MediaStateExternalInitializers,
	MediaStateSetters,
} from '../types';
import { DEFAULT_MEDIA_STATE, getMediaEl } from '../utils';
import { findNextConsecutiveIndex } from '../utils/array';

/**  @category MediaStore */
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
> = () => DEFAULT_MEDIA_STATE;

export const createSettersSlice: StateCreator<
	MediaState & MediaStateSetters & MediaStateExternalInitializers,
	[],
	[],
	MediaStateSetters
> = (set, get) => ({
	replaceAlarms: alarms => set({ alarms }),
	setIsAudio: isAudio => set({ isAudio }),
	setMediaType: mediaType => set({ mediaType }),
	requestFullscreen: () =>
		set(state => {
			const mediaEl = getMediaEl(state);
			if (!mediaEl) {
				return state;
			}
			if (state.isPip) {
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
					previousTime: state.currentTime,
					isPlaying: true,
					currentTime: state.startTime,
					hasPlayedOrSeeked: true,
				};
			}

			return { isPlaying: true, hasPlayedOrSeeked: true };
		}),
	pause: () =>
		set(state => {
			state.emitter.emit('pause');
			const media = getMediaEl(state);
			if (media && state.playPromiseRef.current) {
				void state.playPromiseRef.current.then(() => media.pause());
			}
			return { isPlaying: false };
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
				isMuted: false,
			};
		}),
	mute: () =>
		set(state => {
			state.emitter.emit('mute');
			return {
				isMuted: true,
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
				isPip: true,
			};
		}),
	exitPip: () =>
		set(state => {
			state.emitter.emit('pipExit');
			return { isPip: false };
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
	setIsPipEnabled: (isPipEnabled: boolean) => set({ isPipEnabled }),
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
			// Initialize alarms from start(it will trigger a new search)
			const alarmState = state.alarms
				? {
						currentTimeAlarm: 0,
						nextTimeAlarm: 0,
				  }
				: {};

			return {
				previousTime: state.currentTime,
				currentTime: state.startTime + relativeSeconds,
				hasPlayedOrSeeked: true,
				...alarmState,
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
			let newAlarmState = {
				current: state.currentTimeAlarm,
				next: state.nextTimeAlarm,
			};

			// Creating and updating `onTimeAlarm`
			if (state.alarms.length > 0 && state.isPlaying) {
				// state.currentTime - was already played(previous state)
				const previousTime = state.currentTime;
				// It might happen that first alarm can be at `0` (zero),
				// so we need to initialize from `0` (zero) interval
				const isFirstInterval =
					previousTime === state.currentTimeAlarm &&
					previousTime === state.nextTimeAlarm;
				// Run 1 search for 2 consecutive values
				if (
					(newAlarmState.next < currentRelativeTime &&
						newAlarmState.current < currentRelativeTime) ||
					isFirstInterval
				) {
					// Get next index in `timeAlarm`
					const alarmsIndex = findNextConsecutiveIndex(
						state.alarms,
						currentRelativeTime,
					);
					newAlarmState = {
						current: state.alarms[alarmsIndex] ?? -Infinity,
						next: state.alarms[alarmsIndex + 1] ?? Infinity,
					};
				}

				// Check if we should run event on currentTimeAlarm
				const isCurrentAlarmTriggered =
					currentRelativeTime > state.currentTimeAlarm;
				const isNextAlarmTriggered = currentRelativeTime > state.nextTimeAlarm;
				const hadCurrentAlarmAlreadyBeTriggered =
					previousTime > state.currentTimeAlarm;
				const isCurrentAlarmTurnedOn =
					isCurrentAlarmTriggered &&
					!isNextAlarmTriggered &&
					!hadCurrentAlarmAlreadyBeTriggered;

				// Check if we should run event on nextTimeAlarm
				const hadNextAlarmAlreadyBeTriggered =
					previousTime > state.nextTimeAlarm;
				const isNextAlarmTurnedOn =
					isNextAlarmTriggered && !hadNextAlarmAlreadyBeTriggered;
				const isAlarmTurnedOn = isCurrentAlarmTurnedOn || isNextAlarmTurnedOn;

				if (isAlarmTurnedOn) {
					state.emitter.emit('onTimeAlarm', {
						seconds: currentRelativeTime,
						duration: state.duration,
					});
				}
			}
			if (state.isPlaying) {
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
			let { isPlaying } = state;

			if (currentTime >= state.startTime + state.duration) {
				isPlaying = false;
			}
			return {
				currentTime,
				isPlaying,
				currentTimeAlarm: newAlarmState.current,
				nextTimeAlarm: newAlarmState.next,
			};
		}),
});

type onStoreUpdate = <T>(
	fn?: (store: T) => void,
) => (initializer: StateCreator<T, [], [], T>) => StateCreator<T, [], []>;

const onStoreUpdateMiddleware: onStoreUpdate =
	fn => config => (set, get, api) =>
		config(
			state => {
				set(state);
				fn?.(get());
			},
			get,
			api,
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
