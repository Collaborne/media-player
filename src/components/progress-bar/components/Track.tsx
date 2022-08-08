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

import { TrackStyled } from './TrackStyled';

interface TrackProps {}

export const Track: FC<TrackProps> = () => {
	const { api, getHighlightColorBlended } = useVideo();
	const theme = useTheme();
	const highlights = api?.getHighlights?.();

	// Value in seconds
	const valueSeconds = api?.getCurrentTime?.() || 0;

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

	// Creates and blends already passed segments
	const createPassedSegments = () =>
		getPassedSegments(railSegments, valueSeconds).map(([from, to]) => {
			const start = getPercentFromDuration(videoDuration, from);
			const width = getPercentFromDuration(videoDuration, to - from);
			const intersectedSegments = highlights.filter(
				highlight => from >= highlight.startTime && to <= highlight.endTime,
			);

			const colors = intersectedSegments.map(({ color }) => color);
			// If segment is without highlight, then "blend" it with primary color(default color for track)
			const color = colors.length
				? getHighlightColorBlended?.([...colors, theme.palette.primary.main])
				: undefined;
			return (
				<TrackStyled
					key={uuid()}
					startPoint={start}
					width={width}
					color={color}
				/>
			);
		});

	// Create active segment with it's own blend colors
	const createActiveSegment = () => {
		const activeSegment = getCurrentSegment(railSegments, valueSeconds);

		if (!activeSegment) {
			return null;
		}

		const [from, to] = activeSegment;
		const start = getPercentFromDuration(videoDuration, from);
		const width = getPercentFromDuration(videoDuration, valueSeconds - from);
		const intersectedSegments = highlights.filter(
			highlight => from >= highlight.startTime && to <= highlight.endTime,
		);

		const colors = intersectedSegments.map(({ color }) => color);
		// If segment is without highlight, then "blend" it with primary color(default color for track)
		const color = colors.length
			? blendColors([...colors, theme.palette.primary.main])
			: undefined;
		return (
			<TrackStyled
				key={uuid()}
				startPoint={start}
				width={width}
				color={color}
			/>
		);
	};

	return (
		<>
			{createPassedSegments()}
			{createActiveSegment()}
		</>
	);
};
