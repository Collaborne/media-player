import { Dispatch, RefObject, MutableRefObject, ReactNode } from 'react';
import { Emitter } from 'mitt';
import {
	ControlsConfig,
	EmitterAddRemoveListeners,
	EmitterEvents,
	VideoActions,
	VideoGettersApi,
} from '.';
import type ReactPlayer from 'react-player';
/**
 * Video Players initial state
 */

interface VideoPlayerInitialState {
	playing?: boolean;
	startTime: number;
	endTime: number;
	duration: number;
	currentTime: number;
}

/**
 * Context Provider for playing videos
 */

export interface VideoProviderProps {
	controlsConfig: ControlsConfig;
	initialState?: VideoPlayerInitialState;
	children: ReactNode;
	persistedState?: VideoState;
}

/**
 * State for video. Keeping info about current video player behavior
 */

export interface VideoState {
	lastActivityRef: MutableRefObject<number> | null;
	emitter: Emitter<Record<EmitterEvents, unknown>>;
	videoRef: RefObject<ReactPlayer>;
	playPromiseRef: MutableRefObject<Promise<void> | undefined>;
	playbackRate: number;
	fullscreen: boolean;
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
