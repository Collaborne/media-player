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
	| 'timeUpdate'
	| 'fullscreenEnter'
	| 'fullscreenExit'
	| 'progress'
	| 'end'
	| 'relativeEnd';

export type AddRemoveListener<Arguments> = (
	event: EmitterEvents,
	listener: (args: Arguments) => void,
) => void;
export interface EmitterAddRemoveListeners {
	removeEventListener?: AddRemoveListener<boolean | number | undefined>;
	addEventListener?: AddRemoveListener<boolean | number | undefined>;
}
