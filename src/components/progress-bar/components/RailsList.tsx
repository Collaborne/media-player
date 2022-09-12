import { FC, memo } from 'react';
import { uuid } from 'uuidv4';

import { VideoContext } from '../../../context';
import { Highlight } from '../../../types';
import {
	getPercentFromDuration,
	getRailSegments,
} from '../../../utils/highlights';

import { RailStyled } from './RailStyled';

interface RailListProps {
	highlights: Highlight[];
	videoDuration: number;
	getHighlightColorBlended?: VideoContext['getHighlightColorBlended'];
}

export const createSegmentColor = (
	colors?: string[],
	getHighlightColorBlended?: VideoContext['getHighlightColorBlended'],
) => {
	if (colors && colors?.length > 0 && getHighlightColorBlended) {
		return getHighlightColorBlended(colors);
	}
	return undefined;
};

export const RailsList: FC<RailListProps> = memo(
	({ highlights, videoDuration, getHighlightColorBlended }) => {
		const railSegments = getRailSegments(highlights, videoDuration);
		const segments = railSegments.map(({ start, end }) => {
			const startPoint = getPercentFromDuration(start, videoDuration);
			const width = getPercentFromDuration(end - start, videoDuration);
			const intersectedSegments = highlights.filter(
				highlight => start >= highlight.start && end <= highlight.end,
			);
			const startColorSegment = createSegmentColor(
				highlights.find(({ start: startTime }) => startTime === start)?.colors,
				getHighlightColorBlended,
			);
			const endColorSegment = createSegmentColor(
				highlights.find(({ end: endTime }) => endTime === end)?.colors,
				getHighlightColorBlended,
			);
			const colors = intersectedSegments.map(({ colors }) => colors).flat();

			const blendedColor = colors.length
				? getHighlightColorBlended?.(colors)
				: undefined;
			return (
				<RailStyled
					key={uuid()}
					startPoint={startPoint}
					width={width}
					color={blendedColor}
					startColorSegment={startColorSegment}
					endColorSegment={endColorSegment}
				/>
			);
		});
		return <>{segments}</>;
	},
);
