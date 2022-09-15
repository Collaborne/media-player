import { VideoState } from '.';

export type PartialVideoState = Partial<VideoState> | void;

/** List of setters for the VideoState */
export interface VideoActions {
	play: (state: VideoState) => PartialVideoState;
	pause: (state: VideoState) => PartialVideoState;
	mute: (state: VideoState) => PartialVideoState;
	unmute: (state: VideoState) => PartialVideoState;
	setLoop: (state: VideoState, loop: boolean) => PartialVideoState;
	setPlaybackRate: (
		state: VideoState,
		playbackRate: number,
	) => PartialVideoState;
	setVolume: (state: VideoState, volume: number) => PartialVideoState;
	setCurrentTime: (
		state: VideoState,
		relativeSeconds: number,
	) => PartialVideoState;
	setHasPipTriggeredByClick: (
		state: VideoState,
		hasPipTriggeredByClick: boolean,
	) => PartialVideoState;
	setStartTime: (state: VideoState, startTime: number) => PartialVideoState;
	setEndTime: (state: VideoState, endTime: number) => PartialVideoState;
	setDuration: (state: VideoState, duration: number) => PartialVideoState;

	requestPip: (state: VideoState) => PartialVideoState;
	exitPip: (state: VideoState) => PartialVideoState;
	/** Setter for displaying main controls */
	setShowControls: (state: VideoState, isUpdated: boolean) => PartialVideoState;
	/** Setter for starting animation on `play` event  */
	playAnimationStart: (
		state: VideoState,
		hasStarted: boolean,
	) => PartialVideoState;
	/** Setter for starting animation on `pause` event  */
	pauseAnimationStart: (
		state: VideoState,
		hasPaused: boolean,
	) => PartialVideoState;
	/** Setter for displaying pip controls */
	setShowPipControls: (
		state: VideoState,
		isUpdated: boolean,
	) => PartialVideoState;
	// Private Methods
	_setReady: (state: VideoState) => PartialVideoState;
	_handleProgress: (
		state: VideoState,
		currentTime: number,
	) => PartialVideoState;
}

export type VideoActionKeys = keyof VideoActions;

type VideoActionMap = {
	[Key in keyof VideoActions]: VideoActions[Key] extends undefined
		? {
				type: Key;
		  }
		: {
				type: Key;
				payload?: Parameters<VideoActions[Key]>[1];
		  };
};
export type VideoAction = VideoActionMap[VideoActionKeys];

type VideoSettersMap = {
	[Key in keyof VideoActions]: VideoActions[Key] extends unknown
		? (...args: Parameters<VideoActions[Key]>) => ReturnType<VideoActions[Key]>
		: unknown;
};

export type VideoStateSetter = VideoSettersMap[VideoActionKeys];
