import { FC, memo } from 'react';
import { uuid } from 'uuidv4';

import { Highlight } from '../../../types';
import {
	getPercentFromDuration,
	getRailSegments,
} from '../../../utils/highlights';

import { RailStyled } from './RailStyled';

interface RailListProps {
	highlights: Highlight[];
	videoDuration: number;
	getHighlightColorBlended?: (colors: string[]) => string | undefined;
}

export const RailsList: FC<RailListProps> = memo(
	({ highlights, videoDuration, getHighlightColorBlended }) => {
		const railSegments = getRailSegments(highlights, videoDuration);
		const segments = railSegments.map(({ start, end }) => {
			const startPoint = getPercentFromDuration(start, videoDuration);
			const width = getPercentFromDuration(end - start, videoDuration);
			const intersectedSegments = highlights.filter(
				highlight => start >= highlight.start && end <= highlight.end,
			);
			const startColorSegment = highlights.find(
				({ start: startTime }) => startTime === start,
			)?.color;
			const endColorSegment = highlights.find(
				({ end: endTime }) => endTime === end,
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
	},
);
