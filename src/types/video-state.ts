import { Dispatch } from 'react';

import {
	EmitterEvents,
	EmitterListeners,
	VideoActions,
	VideoGettersApi,
} from '.';

/** State setter/holder for the FullscreenApi.On the hood uses the `fullscreen` package */
export interface FullscreenApi {
	/** Is player in fullscreen mode */
	isFullscreen: boolean;
	/** Enter the fullscreen mode */
	enterFullscreen: () => void;
	/** Exit the fullscreen mode */
	exitFullscreen: () => void;
	/** Toggler for the fullscreen mode */
	toggleFullscreen: () => void;
}

/** An interval that has required `start` and `end` point  */
export interface Segment {
	/** Starting time of a segment */
	start: number;
	/** End time of a segment */
	end: number;
}

/** An interval of timestamps in seconds, that will be "highlighted" in the scrub bar. Useful when you want to split video duration into small segments/chunks */
export interface Highlight extends Segment {
	/** Id of the highlight */
	id: string;
	/** Color of the highlight. This must be a HEX color code */
	colors: string[];
}

/**
 * State for video. Keeping info about current video player behavior
 */

export interface VideoState {
	emitter: EmitterEvents;
	playbackRate: number;
	playing: boolean;
	muted: boolean;
	startTime: number;
	endTime: number;
	duration: number;
	currentTime: number;
	volume: number;
	ready: boolean;
	hasPlayedOrSeeked: boolean;
	pip: boolean;
	showControls: boolean;
	didPlayAnimationStart: boolean;
	didPauseAnimationStart: boolean;
	showPipControls: boolean;
	/** Did pip mode was triggered by click event */
	hasPipTriggeredByClick: boolean;
	/** Storing wrapper ref of the videoPlayer */
	isFullscreen: boolean;
}

export type VideoDispatchArgs = unknown[];

export type VideoActionsDispatch = {
	[key in keyof VideoActions]: (...payload: VideoDispatchArgs) => Dispatch<{
		type: keyof VideoActions;
		payload: VideoDispatchArgs;
	}>;
};

export type VideoApi = Partial<
	VideoActionsDispatch & EmitterListeners & VideoGettersApi
>;
