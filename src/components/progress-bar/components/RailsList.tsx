import { FC, memo } from 'react';
import { uuid } from 'uuidv4';

import { VideoContext } from '../../../context';
import { Highlight } from '../../../types';
import { getRailSegments } from '../../../utils/highlights';
import { createRailsList } from '../utils/create-rails-list';

import { RailStyled } from './RailStyled';

interface RailListProps {
	highlights: Highlight[];
	videoDuration: number;
	getHighlightColorBlended?: VideoContext['getHighlightColorBlended'];
}

export const RailsList: FC<RailListProps> = memo(
	({ highlights, videoDuration, getHighlightColorBlended }) => {
		// Split total rails width into segments from highlights
		const segments = getRailSegments(highlights, videoDuration);
		// Creating an array of necessary rails params from already known segments
		const railListParams = createRailsList({
			highlights,
			segments,
			videoDuration,
			getHighlightColorBlended,
		});

		return (
			<>
				{railListParams.map(
					({
						color,
						endColorSegment,
						startColorSegment,
						startPoint,
						width,
					}) => (
						<RailStyled
							key={uuid()}
							startPoint={startPoint}
							width={width}
							color={color}
							startColorSegment={startColorSegment}
							endColorSegment={endColorSegment}
						/>
					),
				)}
			</>
		);
	},
);
