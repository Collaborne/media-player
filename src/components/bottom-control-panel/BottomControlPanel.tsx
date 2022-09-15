import Grid from '@mui/material/Grid';
import clsx from 'clsx';
import { FC, memo } from 'react';

import { PlayPauseReplay, PlaybackRateButton } from './components';
import { FullscreenButton } from './components/FullscreenButton';
import { FwdButton } from './components/FwdButton';
import { PictureInPictureButton } from './components/PictureInPictureButton';
import { RwdButton } from './components/RwdButton';
import { TimeDisplay } from './components/TimeDisplay';
import { VolumeButton } from './components/VolumeButton';
import { VolumeSlider } from './components/VolumeSlider';
import { useBottomControlPanelHook } from './useBottomControlPanelHook';
import { useBottomControlPanelStyles } from './useBottomControlPanelStyles';

export interface BottomControlPanelProps {
	className?: string;
}

export const BottomControlPanel: FC<BottomControlPanelProps> = memo(
	({ className }) => {
		const { wrapper, gridCentered } = useBottomControlPanelStyles().classes;

		const { hasStarted, showControls } = useBottomControlPanelHook();

		if (!showControls || !hasStarted) {
			return null;
		}

		return (
			<Grid
				container
				className={clsx(wrapper, className)}
				alignItems="center"
				justifyContent="space-between"
				direction="row"
				data-testid="bottom-control-panel"
			>
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
			</Grid>
		);
	},
);
