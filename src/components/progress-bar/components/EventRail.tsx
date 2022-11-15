import { FC } from 'react';

import { useEventRailsContext } from '../../../hooks/use-event-rails-context';
import { getPercentFromDuration } from '../../../utils/highlights';

import { RailStyled } from './RailStyled';
import { useRailStyles } from './useRailStyles';

interface EventRailProps {}

const BLEND_CONFIG = { intensifyAll: true };

export const EventRail: FC<EventRailProps> = () => {
	const { duration, getHighlightColorBlended, highlights } =
		useEventRailsContext();
	const { sliderRail } = useRailStyles().classes;

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
