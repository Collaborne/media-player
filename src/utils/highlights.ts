import { uuid } from 'uuidv4';

import { Highlight, Segment } from '../types/video-state';

import { PROGRESS_BAR_DIVIDER } from './constants';

/** Splitting <ProgressBar/> Rail's into segments from highlights */
export const getRailSegments = (
	highlights: Highlight[],
	videoDuration: number,
): Segment[] => {
	if (!highlights.length) {
		return [];
	}

	const startTimes = highlights.map(({ start }) => start);
	const endTimes = highlights.map(({ end }) => end);

	// Creating a unique array with startTime and endTime values
	const segmentSplitPoints = [
		...new Set([...startTimes, ...endTimes, 0, videoDuration]),
	];

	// Sorting for creating segments
	const sortedSegmentPoints = segmentSplitPoints.sort((a, b) => a - b);

	// Splitting array of unique segment points into segments. Ex: [A,B,C,D]=> [ { start: A, end:B }, { start:B, end:C }, { start:C, end:D } ]
	const segments: Segment[] = [];
	for (let index = 0; index < sortedSegmentPoints.length - 1; index++) {
		segments.push({
			start: segmentSplitPoints[index],
			end: segmentSplitPoints[index + 1],
			id: uuid(),
		});
	}
	return segments;
};

/** Get percentage of a video duration */
export const getPercentFromDuration = (time: number, videoDuration: number) => {
	if (videoDuration && time) {
		return (time * PROGRESS_BAR_DIVIDER) / videoDuration;
	}
	return 0;
};

/** Get the current active segment in an array of segments */
export const getCurrentSegment = (segments: Segment[], currentTime: number) =>
	segments.find(({ start, end }) => start < currentTime && currentTime < end);

/** Get the passed segments in an array of segments */
export const getPassedSegments = (segments: Segment[], currentTime: number) =>
	segments.filter(({ end }) => end < currentTime);
