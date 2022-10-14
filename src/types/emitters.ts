import { Emitter } from 'mitt';

export type VoidEventsKey =
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

/** Events that MediaApi is listening, and have no arguments */
export type VoidEvents = Record<VoidEventsKey, void>;

/** Events that MediaApi is listening, and have arguments */
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

export type MediaEvents = VoidEvents & ExtendedEvents;

export type EmitterEvents = Emitter<MediaEvents>;

/** Event emitted on `timeupdate`. Same as browsers native */
export type TimeUpdateEvent = Record<'seconds' | 'duration', number>;
/** Event emitted when `showControls` was triggered  */
export type ShowControlsEvent = { isUpdated: boolean };
/** Typeguard for `ShowControlsEvent` */
export const isShowControlsEvent = (
	event: unknown,
): event is ShowControlsEvent =>
	(event as ShowControlsEvent).isUpdated !== undefined;
/** Typeguard for `TimeUpdateEvent` */
export const isTimeUpdateEvent = (event: unknown): event is TimeUpdateEvent =>
	(event as TimeUpdateEvent).seconds !== undefined &&
	(event as TimeUpdateEvent).duration !== undefined;

export interface EmitterListeners {
	removeEventListener: EmitterEvents['off'];
	addEventListener: EmitterEvents['on'];
}
