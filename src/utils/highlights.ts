import { Highlight } from '../types/video-state';

import { PROGRESS_BAR_DIVIDER } from './constants';

/** Splitting <ProgressBar/> Rail's into segments from highlights */
export const getRailSegments = (
	highlights: Highlight[],
	videoDuration: number,
): [number, number][] => {
	if (!highlights.length) {
		return [];
	}

	const startArr = highlights.map(({ startTime }) => startTime);
	const endArr = highlights.map(({ endTime }) => endTime);

	// Creating a unique array with startTime and endTime values
	const uniqueStartEndArr = [...new Set([...startArr, ...endArr])];

	// Sorting for creating segments
	const arrayOfAscendingSegmentPoints = uniqueStartEndArr.sort((a, b) => a - b);

	// Add to the tail videoDuration(in case if missing)
	if (!arrayOfAscendingSegmentPoints.includes(videoDuration)) {
		arrayOfAscendingSegmentPoints.push(videoDuration);
	}

	// Splitting array of unique segment points into segments. Ex: [A,B,C,D]=> [[A,B], [B,C],[C,D]]
	const arrayOfSegments: [number, number][] =
		arrayOfAscendingSegmentPoints.reduce(
			(acc: [number, number][], currentValue, index, array) => {
				if (acc.length === 0) {
					return [
						[0, currentValue],
						[currentValue, array[index + 1]],
					];
				}
				if (index === array.length - 1) {
					return acc;
				}
				return [...acc, [currentValue, array[index + 1]]];
			},
			[],
		);
	return arrayOfSegments;
};

/** Get percentage of a video duration */
export const getPercentFromDuration = (videoDuration: number, time: number) => {
	if (videoDuration && time) {
		return (time * PROGRESS_BAR_DIVIDER) / videoDuration;
	}
	return 0;
};
