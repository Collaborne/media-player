import { FC } from 'react';
import { uuid } from 'uuidv4';

import { useVideo } from '../../../hooks';
import {
	getPercentFromDuration,
	getRailSegments,
} from '../../../utils/highlights';

import { RailStyled } from './RailStyled';

interface RailProps {}

export const Rail: FC<RailProps> = () => {
	const { api, getHighlightColorBlended } = useVideo();

	const highlights = api?.getHighlights?.();
	// If we do not have highlights, then display a simple Rail
	if (!highlights || highlights.length === 0) {
		return <RailStyled />;
	}

	const videoDuration = api?.getDuration?.() || 0;

	// Create Rail from highlight segments
	const railSegments = getRailSegments(highlights, videoDuration);
	const segments = railSegments.map(({ start, end }) => {
		const startPoint = getPercentFromDuration(start, videoDuration);
		const width = getPercentFromDuration(end - start, videoDuration);
		const intersectedSegments = highlights.filter(
			highlight => start >= highlight.startTime && end <= highlight.endTime,
		);
		const startColorSegment = highlights.find(
			({ startTime }) => startTime === start,
		)?.color;
		const endColorSegment = highlights.find(
			({ endTime }) => endTime === end,
		)?.color;
		const colors = intersectedSegments.map(({ color }) => color);

		const color = colors.length
			? getHighlightColorBlended?.(colors)
			: undefined;

		return (
			<RailStyled
				key={uuid()}
				startPoint={startPoint}
				width={width}
				color={color}
				startColorSegment={startColorSegment}
				endColorSegment={endColorSegment}
			/>
		);
	});

	return <>{segments}</>;
};
