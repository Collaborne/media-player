import { Emitter } from 'mitt';
import { Dispatch, MutableRefObject, ReactNode, RefObject } from 'react';
import type ReactPlayer from 'react-player';

import {
	ControlsConfig,
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

export interface Highlight {
	/** Id of the highlight */
	id: string;
	/** Starting time of a highlight */
	startTime: number;
	/** End time of a highlight */
	endTime: number;
	/** Color highlight(HEX) */
	color: string;
}

/** Provider's initialization state */
interface VideoPlayerInitialState {
	/** If the video start playing from start */
	playing?: boolean;
	/** Time (in ms) that video will start to play */
	startTime: number;
	/** Time (in ms) that video should pause */
	endTime: number;
	/** Video duration */
	duration: number;
	/** Current played time */
	currentTime: number;
}

/**
 * Context Provider for playing videos
 */

export interface VideoProviderProps {
	/** Configuration that enables/disables some parts of the overlay on top of the video player */
	controlsConfig?: ControlsConfig;
	/** Provider's initialization state */
	initialState?: VideoPlayerInitialState;
	/** ReactNode that will consume the context */
	children: ReactNode;
	/** State that needs to be stored in localStorage */
	persistedState?: VideoState;
	/** Blending colors for highlights presented in `<ProgressBar` */
	getHighlightColorBlended?: (colors: string[]) => string;
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
	currentRelativeTime: number;
	loop: boolean;
	volume: number;
	ready: boolean;
	hasPlayedOrSeeked: boolean;
	pip: boolean;
	oneTimeStopPoint: number | null;
	/** Did pip mode was triggered by click event */
	hasPipTriggeredByClick: boolean;
	/** Storing wrapper ref of the videoPlayer */
	videoContainerRef: RefObject<HTMLDivElement>;
	highlights: Highlight[];
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
