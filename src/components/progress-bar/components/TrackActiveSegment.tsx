import { FC } from 'react';
import { uuid } from 'uuidv4';

import { Segment } from '../../../types';
import { getPercentFromDuration } from '../../../utils/highlights';

/** Metric used for building segments into `<Track/>` */
export interface TrackSegmentMetric {
	startPoint: number;
	width: number;
	start: number;
	end: number;
	id: string;
}
interface TrackActiveSegmentProps {
	valueInSeconds: number;
	videoDuration: number;
	segment?: Segment;
	children: (metrics: TrackSegmentMetric) => JSX.Element;
}

export const TrackActiveSegment: FC<TrackActiveSegmentProps> = ({
	segment,
	valueInSeconds,
	videoDuration,
	children,
}) => {
	if (!segment) {
		return null;
	}
	const { start, end } = segment;
	const startPoint = getPercentFromDuration(start, videoDuration);
	const width = getPercentFromDuration(valueInSeconds - start, videoDuration);

	const trackSegmentMetric: TrackSegmentMetric = {
		startPoint,
		start,
		end,
		width,
		id: uuid(),
	};
	return children(trackSegmentMetric);
};
