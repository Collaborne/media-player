import { Emitter } from 'mitt';
import { Dispatch, MutableRefObject, RefObject } from 'react';
import type ReactPlayer from 'react-player';

import {
	EmitterAddRemoveListeners,
	EmitterEvents,
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
	lastActivityRef: MutableRefObject<number> | null;
	emitter: Emitter<Record<EmitterEvents, unknown>>;
	reactPlayerRef: RefObject<ReactPlayer>;
	playPromiseRef: MutableRefObject<Promise<void> | undefined>;
	playbackRate: number;
	playing: boolean;
	muted: boolean;
	startTime: number;
	endTime: number;
	duration: number;
	currentTime: number;
	loop: boolean;
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
	videoContainerRef: RefObject<HTMLDivElement>;
}

export type VideoDispatchArgs = unknown[];

export type VideoActionsDispatch = {
	[key in keyof VideoActions]: (...payload: VideoDispatchArgs) => Dispatch<{
		type: keyof VideoActions;
		payload: VideoDispatchArgs;
	}>;
};

export type VideoApi = Partial<
	VideoActionsDispatch & EmitterAddRemoveListeners & VideoGettersApi
>;
