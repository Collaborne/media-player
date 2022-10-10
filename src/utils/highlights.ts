import { PROGRESS_BAR_DIVIDER } from './constants';

/** Get percentage of a media duration */
export const getPercentFromDuration = (time: number, mediaDuration: number) => {
	if (mediaDuration && time) {
		return (time * PROGRESS_BAR_DIVIDER) / mediaDuration;
	}
	return 0;
};
