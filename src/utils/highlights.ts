import { PROGRESS_BAR_DIVIDER } from './constants';

/** Get percentage of a media duration */
export const getPercentFromDuration = (
	time: number,
	mediaDuration: number,
	barDivider = PROGRESS_BAR_DIVIDER,
) => {
	if (mediaDuration === 0) {
		return 0;
	}
	return (time * barDivider) / mediaDuration;
};
