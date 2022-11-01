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
	| 'ready'
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
	seeked: { diffMs: number };
	timeupdate: TimeUpdateEvent;
	progress: TimeUpdateEvent;
	showControls: ShowControlsEvent;
	showPipControls: ShowControlsEvent;
	durationchange: { duration: number };
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
