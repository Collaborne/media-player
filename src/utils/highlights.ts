import { PROGRESS_BAR_DIVIDER } from './constants';

/** Get percentage of a video duration */
export const getPercentFromDuration = (time: number, videoDuration: number) => {
	if (videoDuration && time) {
		return (time * PROGRESS_BAR_DIVIDER) / videoDuration;
	}
	return 0;
};
