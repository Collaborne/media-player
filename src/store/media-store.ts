/* eslint-disable max-lines */
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
import {
	findIndexArrayOfConsecutiveNumbers,
	toTwoDigits,
} from '../utils/number';

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
	isPlaying: false,
	isMuted: false,
	fullscreen: false,
	hasPlayedOrSeeked: false,
	isPip: false,
	hasPipTriggeredByClick: true,
	showControls: true,
	showPipControls: false,
	didPlayAnimationStart: false,
	didPauseAnimationStart: false,
	isFullscreen: false,
	currentConditionalTime: 0,
	nextConditionalTime: 0,
	previousTime: 0,
	lastConditionalEventCalled: 0,
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
				previousTime: state.currentTime,
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
			let shoudlConditionalEvent = false;
			const currentRelativeTime = Math.min(
				state.endTime,
				Math.max(0, currentTime - state.startTime),
			);
			let conditionalTime = {
				current: state.currentConditionalTime || 0,
				next: state.nextConditionalTime || 0,
			};
			const [conditionalTimeUpdateArr, timeBeforeSearch] = [
				state.conditionalTimeUpdate,
				state.timeBeforeConditionalTimeUpdate || 0,
			];
			if (conditionalTimeUpdateArr && conditionalTimeUpdateArr.length > 0) {
				const timeSec = toTwoDigits(currentRelativeTime);
				// refreshing values for conditional time
				if (
					conditionalTime.next < timeSec &&
					conditionalTime.current < timeSec
				) {
					const index = findIndexArrayOfConsecutiveNumbers(
						conditionalTimeUpdateArr,
						timeSec,
						timeBeforeSearch,
					);
					conditionalTime = {
						current: conditionalTimeUpdateArr[index],
						next: conditionalTimeUpdateArr[index + 1] ?? Infinity,
					};
				}
				const hasPassedCurrent =
					timeSec - timeBeforeSearch > conditionalTime.current &&
					timeSec - timeBeforeSearch < conditionalTime.next;
				const hasCurrentEventRan =
					state.lastConditionalEventCalled - timeBeforeSearch >
						conditionalTime.current &&
					state.lastConditionalEventCalled - timeBeforeSearch <
						conditionalTime.next;
				if (hasPassedCurrent && !hasCurrentEventRan) {
					shoudlConditionalEvent = true;
				}
				const hasPassedNext =
					state.nextConditionalTime <= timeSec &&
					state.currentTime >= state.nextConditionalTime;

				// console.log(
				// 	'  state.currentTime',
				// 	state.currentTime,
				// 	'  timeSec',
				// 	timeSec,
				// 	'  state.nextConditionalTime',
				// 	state.nextConditionalTime,
				// 	'  state.lastConditionalEventCalled',
				// 	state.lastConditionalEventCalled,
				// );
				console.log(conditionalTime);
				if (hasPassedNext) {
					console.log(conditionalTime);
					console.log('Ran next event');
					shoudlConditionalEvent = true;
				}

				if (shoudlConditionalEvent) {
					console.log('EMIT EVENT', timeSec);
					state.emitter.emit('conditionalTimeUpdate', {
						seconds: timeSec,
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
				lastConditionalEventCalled: shoudlConditionalEvent
					? toTwoDigits(currentRelativeTime)
					: state.lastConditionalEventCalled,
				currentTime: toTwoDigits(currentTime),
				isPlaying,
				currentConditionalTime: conditionalTime.current,
				nextConditionalTime: conditionalTime.next,
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
				// console.log('last called', get().lastConditionalEventCalled);
				// console.log('current', get().currentTime);
				// console.log('prevuous', get().previousTime);
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
