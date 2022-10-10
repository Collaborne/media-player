import { Highlight } from '../../types';

/** Provider's initialization state */
export interface CorePlayerInitialState {
	/** If the media start playing from start */
	playing: boolean;
	/** Time (in ms) that media will start to play */
	startTime: number;
	/** Time (in ms) that media should pause */
	endTime: number;
	/** Media duration */
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
