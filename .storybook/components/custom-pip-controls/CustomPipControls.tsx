import Box from '@mui/material/Box';
import { FC } from 'react';

import { useMediaStore } from '../../../src/context/MediaProvider.js';
import { useOnHoveredPipControlElement } from '../../../src/hooks/use-on-hovered-element.js';
import { PlayPauseReplay } from '../../../src/index.js';

export const CustomPipControls: FC = () => {
	const showPipControls = useMediaStore(state => state.showPipControls);
	const { onMouseEnter, onMouseLeave } = useOnHoveredPipControlElement();
	if (!showPipControls) {
		return null;
	}
	return (
		<Box sx={{ position: 'absolute', display: 'flex' }}>
			<PlayPauseReplay
				size="large"
				svgIconSize="large"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			/>
		</Box>
	);
};
