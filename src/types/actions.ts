import { VideoState } from '.';

export type PartialVideoState = Partial<VideoState> | void;

export type VideoStateSetter = (
	state: VideoState,
	// TODO: Replace *any* with corresponding type structure
	args: any,
) => PartialVideoState;

type NewBounds = Record<'startTime' | 'endTime', number>;

export interface VideoActions {
	play: (state: VideoState) => PartialVideoState;
	setNewBounds: (state: VideoState, duration: NewBounds) => PartialVideoState;
	setOneTimeStopPoint: (
		state: VideoState,
		seconds: number,
	) => PartialVideoState;

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
		relativeSeconds?: number,
	) => PartialVideoState;
	requestFullscreen: (state: VideoState) => PartialVideoState;
	exitFullscreen: (state: VideoState) => PartialVideoState;
	setFullscreen: (state: VideoState, fullscreen: boolean) => PartialVideoState;
	setStartTime: (state: VideoState, startTime: number) => PartialVideoState;
	setEndTime: (state: VideoState, endTime: number) => PartialVideoState;
	setDuration: (state: VideoState, duration: number) => PartialVideoState;
	setKeyboardDisabled: (
		state: VideoState,
		keyboardDisabled: boolean,
	) => PartialVideoState;

	// Private Methods
	_setReady: (state: VideoState) => PartialVideoState;
	_handleProgress: (
		state: VideoState,
		currentTime: number,
	) => PartialVideoState;
}

export type VideoActionKeys = keyof VideoActions;
type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key;
		  }
		: {
				type: Key;
				payload?: M[Key];
		  };
};
export type VideoAction = ActionMap<VideoActions>[VideoActionKeys];
