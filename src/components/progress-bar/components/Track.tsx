import { useTheme } from '@mui/material';
import { FC } from 'react';
import { uuid } from 'uuidv4';

import { useVideo } from '../../../hooks/use-video';
import { PROGRESS_BAR_DIVIDER } from '../../../utils/constants';
import {
	getCurrentSegment,
	getPassedSegments,
	getPercentFromDuration,
	getRailSegments,
} from '../../../utils/highlights';

import { TrackSegment } from './TrackSegment';
import { TrackStyled } from './TrackStyled';

interface TrackProps {}

export const Track: FC<TrackProps> = () => {
	const { api, getHighlightColorBlended } = useVideo();
	const theme = useTheme();
	const highlights = api?.getHighlights?.();

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

	// If we do not have highlights, then no need in "decorating" `<Track />`
	if (!highlights || highlights.length === 0) {
		return <TrackStyled width={value} />;
	}

	const videoDuration = api?.getDuration?.() || 0;

	// Create rail segments from highlights
	const railSegments = getRailSegments(highlights, videoDuration);

	// Passed segments - the complete parts of the track that have been passed
	const passedSegments = getPassedSegments(railSegments, valueInSeconds).map(
		({ start, end }) => {
			const startPoint = getPercentFromDuration(start, videoDuration);
			const width = getPercentFromDuration(end - start, videoDuration);

			return (
				<TrackSegment
					highlights={highlights}
					start={startPoint}
					width={width}
					from={start}
					to={end}
					defaultColor={theme.palette.primary.main}
					key={uuid()}
					getHighlightColorBlended={getHighlightColorBlended}
				/>
			);
		},
	);

	// Active segment - the current active segment where video fits between
	const createActiveSegment = () => {
		const activeSegment = getCurrentSegment(railSegments, valueInSeconds);

		if (!activeSegment) {
			return null;
		}

		const { start, end } = activeSegment;
		const startPoint = getPercentFromDuration(start, videoDuration);
		const width = getPercentFromDuration(valueInSeconds - start, videoDuration);

		return (
			<TrackSegment
				highlights={highlights}
				start={startPoint}
				width={width}
				from={start}
				to={end}
				defaultColor={theme.palette.primary.main}
				key={uuid()}
				getHighlightColorBlended={getHighlightColorBlended}
			/>
		);
	};

	return (
		<>
			{passedSegments}
			{createActiveSegment()}
		</>
	);
};
