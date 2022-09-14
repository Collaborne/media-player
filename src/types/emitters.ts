export type VideoNativeEvent =
	| 'abort'
	| 'canplay'
	| 'canplaythrough'
	| 'durationchange'
	| 'ended'
	| 'error'
	| 'loadstart'
	| 'pause'
	| 'play'
	| 'playing'
	| 'seeked'
	| 'seeking'
	| 'stalled'
	| 'suspend'
	| 'volumechange'
	| 'waiting';

export type EmitterEvents =
	| VideoNativeEvent
	| 'autoplayStart'
	| 'ready'
	| 'firstReady'
	| 'ended'
	| 'mute'
	| 'unnmute'
	| 'setPlaybackRate'
	| 'timeupdate'
	| 'fullscreenEnter'
	| 'fullscreenExit'
	| 'progress'
	| 'end'
	| 'relativeEnd'
	| 'pipEnter'
	| 'pipExit'
	| 'showControls'
	| 'showPipControls';

type EventArgs =
	| ShowControlsEvent
	| TimeUpdateEvent
	| boolean
	| number
	| undefined;

export type AddRemoveListener<Arguments> = (
	event: EmitterEvents,
	listener: (args: Arguments) => void,
) => void;
export interface EmitterAddRemoveListeners {
	removeEventListener: AddRemoveListener<EventArgs>;
	addEventListener: AddRemoveListener<EventArgs>;
}

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
