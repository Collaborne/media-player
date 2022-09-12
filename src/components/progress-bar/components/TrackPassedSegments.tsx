import { FC, memo, useMemo } from 'react';

import { Segment } from '../../../types';
import { getPercentFromDuration } from '../../../utils/highlights';

import { TrackSegmentMetric } from './TrackActiveSegment';

interface TrackPassedSegmentProps {
	videoDuration: number;
	segments?: Segment[];
	children: (metrics?: TrackSegmentMetric[]) => JSX.Element;
}

export const TrackPassedSegment: FC<TrackPassedSegmentProps> = memo(
	({ segments, videoDuration, children }) => {
		const passedTrackMetrics = useMemo(
			() =>
				!segments
					? []
					: segments.map(({ start, end, id }) => {
							const startPoint = getPercentFromDuration(start, videoDuration);
							const width = getPercentFromDuration(end - start, videoDuration);
							return {
								startPoint,
								start,
								end,
								width,
								id,
							};
					  }),
			[segments, videoDuration],
		);
		if (!segments || segments.length === 0) {
			return null;
		}
		return children(passedTrackMetrics);
	},
);
