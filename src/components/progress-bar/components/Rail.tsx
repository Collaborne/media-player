import { FC } from 'react';
import { uuid } from 'uuidv4';

import { useVideo } from '../../../hooks';
import { blend } from '../../../utils/colors';
import {
	getPercentFromDuration,
	getRailSegments,
} from '../../../utils/highlights';

import { RailStyled } from './RailStyled';

interface RailProps {}

export const Rail: FC<RailProps> = () => {
	const { api, getHighlightColorBlended } = useVideo();
	const highlights = api?.getHighlights?.();
	const videoDuration = api?.getDuration?.() || 0;

	const blendColors = getHighlightColorBlended || blend;

	// If we do not have highlights, then display a simple Rail
	if (!highlights) {
		return <RailStyled />;
	}
	// Create Rail from highlight segments
	const railSegments = getRailSegments(highlights, videoDuration);
	const createSegments = railSegments.map(([from, to]) => {
		const start = getPercentFromDuration(videoDuration, from);
		const width = getPercentFromDuration(videoDuration, to - from);
		const intersectedSegments = highlights.filter(
			highlight => from >= highlight.startTime && to <= highlight.endTime,
		);
		const startColorSegment = highlights.find(
			({ startTime }) => startTime === from,
		)?.color;
		const endColorSegment = highlights.find(
			({ endTime }) => endTime === to,
		)?.color;
		const colors = intersectedSegments.map(({ color }) => color);

		const color = colors.length ? blendColors(colors) : undefined;

		return (
			<RailStyled
				key={uuid()}
				startPoint={start}
				width={width}
				color={color}
				startColorSegment={startColorSegment}
				endColorSegment={endColorSegment}
			/>
		);
	});

	return <>{createSegments}</>;
};
