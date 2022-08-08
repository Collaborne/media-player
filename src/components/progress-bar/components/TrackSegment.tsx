import { FC } from 'react';

import { VideoContext } from '../../../context';
import { Highlight } from '../../../types/video-state';

import { TrackStyled } from './TrackStyled';

interface TrackSegmentProps {
	highlights: Highlight[];
	from: number;
	to: number;
	start: number;
	width: number;
	defaultColor: string;
	getHighlightColorBlended: VideoContext['getHighlightColorBlended'];
}

export const TrackSegment: FC<TrackSegmentProps> = ({
	from,
	highlights,
	to,
	start,
	width,
	defaultColor,
	getHighlightColorBlended,
}) => {
	const intersectedSegments = highlights.filter(
		highlight => from >= highlight.startTime && to <= highlight.endTime,
	);

	const colors = intersectedSegments.map(({ color }) => color);
	// If segment is without highlight, then "blend" it with primary color(default color for track)
	const color = colors.length
		? getHighlightColorBlended?.([...colors, defaultColor])
		: undefined;
	return <TrackStyled startPoint={start} width={width} color={color} />;
};
