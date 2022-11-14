import Grid from '@mui/material/Grid';
import { FC } from 'react';

import { PlayPauseReplay } from '../../../src';
import { useMediaStore } from '../../../src/context/MediaProvider';
import { useOnHoveredPipControlElement } from '../../../src/hooks/use-on-hovered-element';

export const CustomPipControls: FC = () => {
	const showPipControls = useMediaStore(state => state.showPipControls);
	const { onMouseEnter, onMouseLeave } = useOnHoveredPipControlElement();
	if (!showPipControls) {
		return null;
	}
	return (
		<Grid position="absolute" display="flex">
			<PlayPauseReplay
				size="large"
				svgIconSize="large"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			/>
		</Grid>
	);
};
