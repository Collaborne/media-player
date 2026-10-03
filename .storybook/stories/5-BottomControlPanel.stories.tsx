import Grid from '@mui/material/Grid';
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
					<Grid className={gridCentered} size="grow">
						<Grid
							className={gridCentered}
							size="grow"
							sx={{ justifyContent: 'flex-start' }}
						>
							<PlayPauseReplay svgIconSize="medium" />
							<RwdButton />
							<FwdButton />
							<VolumeButton />
							<VolumeSlider />
						</Grid>
					</Grid>
					<Grid
						className={gridCentered}
						size="grow"
						sx={{ justifyContent: 'center' }}
					>
						<TimeDisplay />
					</Grid>
					<Grid
						className={gridCentered}
						size="grow"
						sx={{ justifyContent: 'flex-end' }}
					>
						<PlaybackRateButton />
						<PictureInPictureButton />
						<FullscreenButton />
					</Grid>
				</BottomControlButtonsComponent>
			</BottomControls>
		</Controls>
	);
};

export const BottomControlButtonsDisabled: React.FC = () => {
	const { gridCentered } = useMediaPlayerStyles().classes;

	return (
		<Controls>
			<BottomControls>
				<BottomControlButtonsComponent>
					<Grid className={gridCentered} size="grow">
						<Grid
							className={gridCentered}
							size="grow"
							sx={{ justifyContent: 'flex-start' }}
						>
							<PlayPauseReplay svgIconSize="medium" disabled />
							<RwdButton disabled />
							<FwdButton disabled />
							<VolumeButton disabled />
							<VolumeSlider />
						</Grid>
					</Grid>
					<Grid
						className={gridCentered}
						size="grow"
						sx={{ justifyContent: 'center' }}
					>
						<TimeDisplay />
					</Grid>
					<Grid
						className={gridCentered}
						size="grow"
						sx={{ justifyContent: 'flex-end' }}
					>
						<PlaybackRateButton disabled />
						<PictureInPictureButton disabled />
						<FullscreenButton disabled />
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
