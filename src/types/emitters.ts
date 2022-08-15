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
	| 'captionsShow'
	| 'unnmute'
	| 'captionsHide'
	| 'setPlaybackRate'
	| 'timeupdate'
	| 'fullscreenEnter'
	| 'fullscreenExit'
	| 'progress'
	| 'end'
	| 'relativeEnd'
	| 'pipEnter'
	| 'pipExit';

export type AddRemoveListener<Arguments> = (
	event: EmitterEvents,
	listener: (args: Arguments) => void,
) => void;
export interface EmitterAddRemoveListeners {
	removeEventListener?: AddRemoveListener<boolean | number | undefined>;
	addEventListener?: AddRemoveListener<boolean | number | undefined>;
}

/** DOM event `timeupdate` has seconds and duration properties, that are not present in `Event` typings */
export interface ExtendedTimeUpdateEvent
	extends Event,
		Record<'seconds' | 'duration', number> {}
