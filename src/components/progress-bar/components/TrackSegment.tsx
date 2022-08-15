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
		highlight => from >= highlight.start && to <= highlight.end,
	);

	const colors = intersectedSegments.map(({ color }) => color);
	// If there are no colors, it picks no color (undefined) = not the primary color.
	const color = colors.length
		? getHighlightColorBlended?.([...colors, defaultColor])
		: undefined;
	return <TrackStyled startPoint={start} width={width} color={color} />;
};
