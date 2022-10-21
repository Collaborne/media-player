import Grid from '@mui/material/Grid';
import { FC, ReactNode } from 'react';
import { useIsAudio } from '../../hooks/use-is-audio';

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
import { CenteredBottomPlayback } from '../centered-bottom-playback/CenteredBottomPlayback';
import { CenteredPlayButton } from '../centered-play-button/CenteredPlayButton';
import { CenteredReplayButton } from '../centered-replay-button/CenteredReplayButton';
import { Controls } from '../controls/Controls';
import { useControlsStyles } from '../controls/useControlsStyles';
import { CorePlayer, CorePlayerProps } from '../core-player/CorePlayer';
import { PauseAnimation } from '../play-pause-animation/PauseAnimation';
import { PlayAnimation } from '../play-pause-animation/PlayAnimation';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useMediaPlayerStyles } from './useMediaPlayerStyles';

export interface MediaPlayerProps extends Omit<CorePlayerProps, 'children'> {
	children?: ReactNode;
}

/** A "media-player" from the box. A result of MediaProvider and MediaContainer */
export const MediaPlayer: FC<MediaPlayerProps> = ({
	children,
	...corePlayerProps
}) => {
	const isAudio = useIsAudio();
	const { gridCentered } = useMediaPlayerStyles().classes;
	const { controls } = useControlsStyles({ isAudio }).classes;
	return (
		<CorePlayer {...corePlayerProps}>
			<Grid className={controls}>
				<CenteredPlayButton />
				<CenteredBottomPlayback />
			</Grid>
			<Controls>
				{children}
				<PlayAnimation />
				<PauseAnimation />
				<CenteredReplayButton />
				<BottomControls>
					<ProgressBar />
					<BottomControlButtons>
						<Grid item className={gridCentered} xs>
							<Grid
								item
								className={gridCentered}
								xs
								justifyContent="flex-start"
							>
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
					</BottomControlButtons>
				</BottomControls>
			</Controls>
		</CorePlayer>
	);
};
