import { EmitterEvents } from '.';

/** An interval that has required `start` and `end` point  */
export interface Segment {
	/** Starting time of a segment */
	start: number;
	/** End time of a segment */
	end: number;
}

/** An interval of timestamps in seconds, that will be "highlighted" in the scrub bar. Useful when you want to split media duration into small segments/chunks */
export interface Highlight extends Segment {
	/** Id of the highlight */
	id: string;
	/** Color of the highlight. This must be a HEX color code */
	colors: string[];
}

/**
 * State for media. Keeping info about current media player behavior
 * @category MediaStore
 */

export interface MediaState {
	emitter: EmitterEvents;
	playbackRate: number;
	isPlaying: boolean;
	isMuted: boolean;
	startTime: number;
	endTime: number;
	duration: number;
	currentTime: number;
	volume: number;
	ready: boolean;
	hasPlayedOrSeeked: boolean;
	isPip: boolean;
	showControls: boolean;
	showPipControls: boolean;
	/** Did pip mode was triggered by click event */
	hasPipTriggeredByClick: boolean;
	/** Storing wrapper ref of the mediaPlayer */
	isFullscreen: boolean;
	/** Current time value for the conditional time in seconds */
	currentTimeAlarm: number;
	/** Next time value for the conditional time in seconds */
	nextTimeAlarm: number;
}

export type State = unknown;
export type PartialState<T extends State> =
	| Partial<T>
	| ((state: T) => Partial<T>);
export type StateSelector<T extends State, U extends State> = (state: T) => U;
