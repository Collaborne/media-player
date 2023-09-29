import { Emitter } from 'mitt';

/**
 *  @category MediaStore
 * @category Events
 */
export type VoidEventsKey =
	| '*'
	| 'play'
	| 'pause'
	| 'autoplayStart'
	/**  Emitted each time when player is ready to play(ex: we have bites loaded and ready to play content) */
	| 'ready'
	/** Emitted for first time when player is mounted and first bites are ready to be player(it happens only once) */
	| 'firstReady'
	| 'ended'
	| 'mute'
	| 'unnmute'
	| 'end'
	| 'pipEnter'
	| 'pipExit'
	| 'fullscreenEnter'
	| 'fullscreenExit';

/** Events that MediaApi is listening, and have no arguments
 * @category MediaStore
 * @category Events
 */
export type VoidEvents = Record<VoidEventsKey, void>;

/** Events that MediaApi is listening, and have arguments
 * @category MediaStore
 * @category Events
 */
export type ExtendedEvents = {
	setPlaybackRate: { playbackRate: number };
	/** See details here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event */
	seeked: { diffMs: number };
	/** See details here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event */
	timeupdate: TimeUpdateEvent;
	/** See details here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event */
	progress: TimeUpdateEvent;
	showControls: ShowControlsEvent;
	showPipControls: ShowControlsEvent;
	durationchange: { duration: number };
	/** Emitted when an alarm timestamp matched current playing duration  */
	onTimeAlarm: TimeUpdateEvent;
};

/**
 * @category MediaStore
 * @category Events
 * */
export type MediaEvents = VoidEvents & ExtendedEvents;

/**
 * @category MediaStore
 * @category Events
 * */
export type EmitterEvents = Emitter<MediaEvents>;

/** Event emitted on `timeupdate`. Same as browsers native
 * @category MediaStore
 * @category Events
 */
export type TimeUpdateEvent = Record<'seconds' | 'duration', number>;
/** Event emitted when `showControls` was triggered
 * @category MediaStore
 * @category Events
 */
export type ShowControlsEvent = { isUpdated: boolean };
/** Typeguard for `ShowControlsEvent`
 * @category MediaStore
 * @category Events
 */
export const isShowControlsEvent = (
	event: unknown,
): event is ShowControlsEvent =>
	(event as ShowControlsEvent).isUpdated !== undefined;
/** Typeguard for `TimeUpdateEvent`
 * @category MediaStore
 * @category Events
 */
export const isTimeUpdateEvent = (event: unknown): event is TimeUpdateEvent =>
	(event as TimeUpdateEvent).seconds !== undefined &&
	(event as TimeUpdateEvent).duration !== undefined;

/** Add/Remove EventListeners
 * @category MediaStore
 * @category Events
 */
export interface EmitterListeners {
	removeEventListener: EmitterEvents['off'];
	addEventListener: EmitterEvents['on'];
}
