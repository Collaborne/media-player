import { Highlight } from '../../types';

/** Provider's initialization state */
export interface CorePlayerInitialState {
	/** If the video start playing from start */
	playing: boolean;
	/** Time (in ms) that video will start to play */
	startTime: number;
	/** Time (in ms) that video should pause */
	endTime: number;
	/** Video duration */
	duration: number;
	/** Current played time */
	currentTime: number;
	highlights: Highlight[];
}

export const PROVIDER_INITIAL_STATE: CorePlayerInitialState = {
	playing: false,
	startTime: 0,
	endTime: 0,
	duration: 0,
	currentTime: 0,
	highlights: [],
};
