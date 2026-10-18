import { FC } from 'react';

import { useMediaStore } from '../../../context/index.js';
import { useHighlights } from '../../../hooks/use-highlights.js';
import { getPercentFromDuration } from '../../../utils/highlights.js';

import { RailStyled } from './RailStyled.js';
import { useRailStyles } from './useRailStyles.js';

const BLEND_CONFIG = { intensifyAll: true };

export const Rail: FC = () => {
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
