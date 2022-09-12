import { useTheme } from '@mui/material';
import { FC, useMemo } from 'react';

import { useVideo } from '../../../hooks/use-video';
import { PROGRESS_BAR_DIVIDER } from '../../../utils/constants';
import {
	getCurrentSegment,
	getPassedSegments,
	getRailSegments,
} from '../../../utils/highlights';

import { TrackActiveSegment } from './TrackActiveSegment';
import { TrackPassedSegment } from './TrackPassedSegments';
import { TrackSegment } from './TrackSegment';
import { TrackStyled } from './TrackStyled';

interface TrackProps {}

export const Track: FC<TrackProps> = () => {
	const { api, highlights, getHighlightColorBlended } = useVideo();
	const theme = useTheme();

	const valueInSeconds = api?.getCurrentTime?.() || 0;

	// Value in ProgressBar metric (defined by PROGRESS_BAR_DIVIDER)
	const value = (() => {
		const videoDuration = api?.getDuration?.();
		const currentTime = api?.getCurrentTime?.();
		if (videoDuration && currentTime) {
			return (currentTime / videoDuration) * PROGRESS_BAR_DIVIDER;
		}
		return 0;
	})();

	const videoDuration = api?.getDuration?.() || 0;

	// Create rail segments from highlights
	const railSegments = useMemo(
		() => getRailSegments(highlights || [], videoDuration),
		[highlights, videoDuration],
	);

	// Active segment - the current active segment where video fits between
	const activeSegment = getCurrentSegment(railSegments, valueInSeconds);

	// Passed segments - segments that we're passed
	const passedSegments = useMemo(
		() => getPassedSegments(railSegments, valueInSeconds),
		// Calculating new passed segment if the new active was changed
		//  or new highlight triggered a new Segments
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[activeSegment, railSegments],
	);
	// If we do not have highlights, then no need in "decorating" `<Track />`
	if (!highlights || highlights.length === 0) {
		return <TrackStyled width={value} />;
	}

	return (
		<>
			<TrackPassedSegment
				segments={passedSegments}
				videoDuration={videoDuration}
			>
				{passedTrackMetrics => (
					<>
						{passedTrackMetrics?.map(
							({ start, end, startPoint, width, id }) => (
								<TrackSegment
									highlights={highlights}
									start={startPoint}
									width={width}
									from={start}
									to={end}
									defaultColor={theme.palette.primary.main}
									key={id}
									getHighlightColorBlended={getHighlightColorBlended}
								/>
							),
						)}
					</>
				)}
			</TrackPassedSegment>
			<TrackActiveSegment
				valueInSeconds={valueInSeconds}
				videoDuration={videoDuration}
				segment={activeSegment}
			>
				{({ start, end, startPoint, width, id }) => (
					<TrackSegment
						highlights={highlights}
						start={startPoint}
						width={width}
						from={start}
						to={end}
						defaultColor={theme.palette.primary.main}
						key={id}
						getHighlightColorBlended={getHighlightColorBlended}
					/>
				)}
			</TrackActiveSegment>
		</>
	);
};
