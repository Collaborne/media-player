import { FC } from 'react';

import { useVideo } from '../../../hooks';
import { getPercentFromDuration } from '../../../utils/highlights';

import { RailStyled } from './RailStyled';
import { useRailStyles } from './useRailStyles';

interface RailProps {}

const BLEND_CONFIG = { intensifyAll: true };

export const Rail: FC<RailProps> = () => {
	const { sliderRail } = useRailStyles().classes;
	const { api, highlights, getHighlightColorBlended } = useVideo();
	const videoDuration = api?.getDuration?.() || 0;

	return (
		<div className={sliderRail}>
			{highlights?.map(({ id, colors, start, end }) => (
				<RailStyled
					key={id}
					startPoint={getPercentFromDuration(start, videoDuration)}
					width={getPercentFromDuration(end - start, videoDuration)}
					color={getHighlightColorBlended?.(colors)}
					startColorSegment={getHighlightColorBlended?.(colors, BLEND_CONFIG)}
					endColorSegment={getHighlightColorBlended?.(colors, BLEND_CONFIG)}
				/>
			))}
		</div>
	);
};
