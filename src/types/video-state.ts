import { Dispatch, MutableRefObject, ReactNode } from 'react';
import { Emitter } from 'mitt';
import {
	ControlsConfig,
	EmitterAddRemoveListeners,
	EmitterEvents,
	VideoActions,
	VideoGetters,
} from '.';
import { BaseReactPlayerProps } from 'react-player/base';

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
}

/**
 * State for video. Keeping info about current video player behavior
 */

export interface VideoState {
	lastActivityRef?: MutableRefObject<number | undefined>;
	// to fix emitter state
	emitter?: Emitter<Record<EmitterEvents, unknown>>;
	// fix TS for React Player Ref
	videoRef?: MutableRefObject<BaseReactPlayerProps | undefined>;
	oneStopPoint?: number;
	playPromiseRef?: MutableRefObject<Promise<void> | undefined>;
	playbackRate?: number;
	fullscreen?: boolean;
	playing?: boolean;
	muted?: boolean;
	startTime: number;
	endTime: number;
	duration: number;
	currentTime: number;
	currentRelativeTime?: number;
	loop?: boolean;
	volume?: number;
	ready?: boolean;
	hasPlayedOrSeeked?: boolean;
	pip?: boolean;
	oneTimeStopPoint?: number | null;
	keyboardDisabled?: boolean;
}

export type VideoActionsDispatch = {
	[key in keyof VideoActions]: (payload: VideoState | any) => Dispatch<{
		type: keyof VideoActions;
		payload: VideoState | any;
	}>;
};

export type VideoApi = Partial<
	VideoActionsDispatch & EmitterAddRemoveListeners & VideoGetters
>;
