import { Grid } from '@mui/material';
import React from 'react';

import { BottomControlButtons as BottomControlButtonsComponent } from '../../src/components/bottom-control-buttons/BottomControlButtons';
import {
	PlayPauseReplay,
	RwdButton,
	FwdButton,
	VolumeButton,
	VolumeSlider,
	TimeDisplay,
	PlaybackRateButton,
	PictureInPictureButton,
	FullscreenButton,
} from '../../src/components/bottom-control-buttons/components';
import { BottomControls } from '../../src/components/bottom-controls/BottomControls';
import { Controls } from '../../src/components/controls/Controls';
import { useMediaPlayerStyles } from '../../src/components/media-player/useMediaPlayerStyles';
import { withCorePlayer, withDemoCard } from '../decorators';

export const BottomControlButtons: React.FC = () => {
	const { gridCentered } = useMediaPlayerStyles().classes;

	return (
		<Controls>
			<BottomControls>
				<BottomControlButtonsComponent>
					<Grid item className={gridCentered} xs>
						<Grid item className={gridCentered} xs justifyContent="flex-start">
							<PlayPauseReplay svgIconSize="medium" />
							<RwdButton />
							<FwdButton />
							<VolumeButton />
							<VolumeSlider />
						</Grid>
					</Grid>
					<Grid item className={gridCentered} xs justifyContent="center">
						<TimeDisplay />
					</Grid>
					<Grid item className={gridCentered} xs justifyContent="flex-end">
						<PlaybackRateButton />
						<PictureInPictureButton />
						<FullscreenButton />
					</Grid>
				</BottomControlButtonsComponent>
			</BottomControls>
		</Controls>
	);
};

export default {
	title: 'Media Player Controls',
	component: BottomControlButtons,
	decorators: [withCorePlayer, withDemoCard],
	parameters: {
		controls: { expanded: true },
	},
};
