import { Paper } from '@mui/material';
import React from 'react';
import {
	PiArrowClockwise,
	PiArrowCounterClockwise,
	PiArrowCounterClockwiseFill,
	PiCornersIn,
	PiCornersOut,
	PiPauseCircleFill,
	PiPictureInPicture,
	PiPlay,
	PiPlayCircleFill,
	PiSpeakerSimpleHigh,
	PiSpeakerSimpleLow,
	PiSpeakerSimpleX,
} from 'react-icons/pi';

import { withDemoCard, withPlayerTheme } from '../decorators';

export const IconButtonsAndIcons: React.FC = () => {
	return (
		<Paper sx={{ padding: 2, marginBottom: 3 }}>
			<h3>Fixed size icons</h3>
			<PiPlay />
			<PiSpeakerSimpleHigh />
			<PiSpeakerSimpleLow />
			<PiSpeakerSimpleX />
			<PiArrowClockwise />
			<PiArrowCounterClockwise />
			<PiCornersOut />
			<PiCornersIn />
			<PiPictureInPicture />
			<PiPlayCircleFill />
			<PiArrowCounterClockwiseFill />
			<PiPauseCircleFill />
		</Paper>
	);
};

export default {
	title: 'UI Kit',
	component: IconButtonsAndIcons,
	decorators: [withDemoCard, withPlayerTheme],
};
