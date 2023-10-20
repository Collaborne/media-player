import Grid from '@mui/material/Grid';
import { FC, memo, ReactNode } from 'react';

import { BottomControlButtons } from '../bottom-control-buttons/BottomControlButtons';
import {
	TimeDisplay,
	PlaybackRateButton,
	PictureInPictureButton,
	FullscreenButton,
} from '../bottom-control-buttons/components';
import { FwdButton } from '../bottom-control-buttons/components/FwdButton';
import { PlayPauseReplay } from '../bottom-control-buttons/components/PlayPauseReplay';
import { RwdButton } from '../bottom-control-buttons/components/RwdButton';
import { VolumeButton } from '../bottom-control-buttons/components/VolumeButton';
import { VolumeSlider } from '../bottom-control-buttons/components/VolumeSlider';
import { BottomControls } from '../bottom-controls/BottomControls';
import { CenteredPlayButton } from '../centered-play-button/CenteredPlayButton';
import { CenteredReplayButton } from '../centered-replay-button/CenteredReplayButton';
import { Controls } from '../controls/Controls';
import { useControlsStyles } from '../controls/useControlsStyles';
import { CorePlayer, CorePlayerProps } from '../core-player/CorePlayer';
import { PlayerFrame } from '../frame';
import { PauseAnimation } from '../play-pause-animation/PauseAnimation';
import { PlayAnimation } from '../play-pause-animation/PlayAnimation';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { AdditionalControls } from './components/AdditionalControls';
import { useMediaPlayerStyles } from './useMediaPlayerStyles';

export interface MediaPlayerProps extends Omit<CorePlayerProps, 'children'> {
	classes?: {
		playerFrame?: string;
	};
	children?: ReactNode;
}

/**
 * Out of the box media player, with all functionality and UI included
 * @category React Component
 * @category Player
 */
export const MediaPlayer: FC<MediaPlayerProps> = memo(
	({ children, isPipEnabled = true, classes, ...corePlayerProps }) => {
		const { classes: playerClasses } = useMediaPlayerStyles();
		const { controls } = useControlsStyles().classes;
		return (
			<CorePlayer isPipEnabled={isPipEnabled} {...corePlayerProps}>
				<PlayerFrame className={classes?.playerFrame} />
				<Grid className={controls}>
					<CenteredPlayButton />
				</Grid>
				<AdditionalControls />
				<Controls>
					{children}
					<PlayAnimation />
					<PauseAnimation />
					<CenteredReplayButton />
					<BottomControls>
						<BottomControlButtons>
							<ProgressBar className={playerClasses.progressBar} />
							<Grid
								item
								className={playerClasses.gridCentered}
								xs
								justifyContent="flex-start"
							>
								<PlayPauseReplay svgIconSize="medium" />
								<RwdButton />
								<FwdButton />
								<VolumeButton />
								<VolumeSlider />
							</Grid>
							<Grid
								item
								className={playerClasses.gridCentered}
								xs
								justifyContent="center"
							>
								<TimeDisplay />
							</Grid>
							<Grid
								item
								className={playerClasses.gridCentered}
								xs
								justifyContent="flex-end"
							>
								<PlaybackRateButton size="small" />
								{isPipEnabled && <PictureInPictureButton />}
								<FullscreenButton />
							</Grid>
						</BottomControlButtons>
					</BottomControls>
				</Controls>
			</CorePlayer>
		);
	},
);
