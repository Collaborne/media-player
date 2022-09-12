import { VideoContext } from '../../../context';
import { Highlight, Segment } from '../../../types';
import { getPercentFromDuration } from '../../../utils/highlights';
import { RailStyledProps } from '../components/RailStyled';

const createSegmentColor = (
	colors?: string[],
	getHighlightColorBlended?: VideoContext['getHighlightColorBlended'],
) => {
	if (colors && colors?.length > 0 && getHighlightColorBlended) {
		return getHighlightColorBlended(colors);
	}
	return undefined;
};

interface RailsListParams {
	segments: Segment[];
	videoDuration: number;
	highlights: Highlight[];
	getHighlightColorBlended: VideoContext['getHighlightColorBlended'];
}

type CreateRailsList = (params: RailsListParams) => RailStyledProps[];

export const createRailsList: CreateRailsList = ({
	segments,
	getHighlightColorBlended,
	highlights,
	videoDuration,
}) => {
	const railsParams = segments.map(({ start, end }) => {
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
		return {
			startPoint,
			width,
			color: blendedColor,
			startColorSegment,
			endColorSegment,
		};
	});
	return railsParams;
};
