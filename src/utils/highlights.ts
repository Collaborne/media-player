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

	const getSmallestRange = (startWith = 0) => {
		const smallestStart = Math.min(
			...startArr.filter(item => item > startWith),
		);
		const smallestEnd = Math.min(...endArr.filter(item => item > startWith));
		return Math.min(smallestStart, smallestEnd);
	};

	const result: [number, number][] = [];
	let startWith = 0;
	while (startWith <= videoDuration) {
		result.push([startWith, getSmallestRange(startWith)]);
		startWith = getSmallestRange(startWith);
	}
	// Adding last segment - from last segment to the video end
	if (startWith !== videoDuration) {
		result.push([startWith, videoDuration]);
	}
	return result;
};

/** Get percentage of a video duration */
export const getPercentFromDuration = (videoDuration: number, time: number) => {
	if (videoDuration && time) {
		return (time * PROGRESS_BAR_DIVIDER) / videoDuration;
	}
	return 0;
};
