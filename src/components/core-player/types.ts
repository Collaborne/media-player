import { Highlight } from '../../types';

/** MediaStore initialization state */
export interface CorePlayerInitialState {
	playing: boolean;
	/** Initial start time in seconds */
	startTime: number;
	/** Initial time for pausing in seconds */
	endTime: number;
	/** Media total time(duration) in seconds */
	duration: number;
	/** Current played time in seconds */
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
