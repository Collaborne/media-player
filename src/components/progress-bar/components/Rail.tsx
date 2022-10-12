import { FC } from 'react';

import { useMediaStore } from '../../../context';
import { useHighlights } from '../../../hooks/use-highlights';
import { getPercentFromDuration } from '../../../utils/highlights';

import { RailStyled } from './RailStyled';
import { useRailStyles } from './useRailStyles';

interface RailProps {}

const BLEND_CONFIG = { intensifyAll: true };

export const Rail: FC<RailProps> = () => {
	const { highlights } = useHighlights();
	const { sliderRail } = useRailStyles().classes;
	const getHighlightColorBlended = useMediaStore(
		state => state.getHighlightColorBlended,
	);

	const duration = useMediaStore(state => state.duration);

	return (
		<div className={sliderRail}>
			{highlights?.map(({ id, colors, start, end }) => {
				const highlightEdgesColor = getHighlightColorBlended?.(
					colors,
					BLEND_CONFIG,
				);

				return (
					<RailStyled
						key={id}
						startPoint={getPercentFromDuration(start, duration)}
						width={getPercentFromDuration(end - start, duration)}
						color={getHighlightColorBlended?.(colors)}
						startColorSegment={highlightEdgesColor}
						endColorSegment={highlightEdgesColor}
					/>
				);
			})}
		</div>
	);
};
