import { VideoState } from '../types';

export const PROVIDER_INITIAL_STATE: Partial<VideoState> = {
	playing: false,
	startTime: 0,
	endTime: 0,
	duration: 0,
	currentTime: 0,
};
