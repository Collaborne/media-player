import Grid from '@mui/material/Grid';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { useVideo } from '../../hooks';
import { isShowControlsEvent } from '../../types';

import { PlayPauseReplay, PlaybackRateButton } from './components';
import { FullscreenButton } from './components/FullscreenButton';
import { FwdButton } from './components/FwdButton';
import { PictureInPictureButton } from './components/PictureInPictureButton';
import { RwdButton } from './components/RwdButton';
import { TimeDisplay } from './components/TimeDisplay';
import { VolumeButton } from './components/VolumeButton';
import { VolumeSlider } from './components/VolumeSlider';
import { useBottomControlPanelStyles } from './useBottomControlPanelStyles';

export interface BottomControlPanelProps {
	className?: string;
}

export const BottomControlPanel: FC<BottomControlPanelProps> = ({
	className,
}) => {
	const [isVisible, setIsVisible] = useState(true);
	const { api } = useVideo();
	// Bottom panel styles
	const { wrapper, gridCentered } = useBottomControlPanelStyles().classes;

	const hasStarted = api?.getHasPlayedOrSeeked?.();

	useEffect(() => {
		if (!api) {
			return;
		}
		const setControlsVisibility = (e: unknown) => {
			if (isShowControlsEvent(e)) {
				setIsVisible(e.isUpdated);
			}
		};
		api.addEventListener?.('showControls', e => setControlsVisibility(e));
		return () => {
			api.removeEventListener?.('showControls', e => setControlsVisibility(e));
		};
	}, [api]);

	if (!isVisible || !hasStarted) {
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
};
