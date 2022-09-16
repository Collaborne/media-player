import Grid from '@mui/material/Grid';
import { FC, ReactNode } from 'react';

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
import { CorePlayer, CorePlayerProps } from '../core-player/CorePlayer';
import { PauseAnimation } from '../play-pause-animation/PauseAnimation';
import { PlayAnimation } from '../play-pause-animation/PlayAnimation';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useVideoPlayerStyles } from './useVideoPlayerStyles';

export interface VideoPlayerProps extends Omit<CorePlayerProps, 'children'> {
	children?: ReactNode;
}

/** A "video-player" from the box. A result of VideoProvider and VideoContainer */
export const VideoPlayer: FC<VideoPlayerProps> = ({
	children,
	...corePlayerProps
}) => {
	const { gridCentered } = useVideoPlayerStyles().classes;
	return (
		<CorePlayer {...corePlayerProps}>
			<Controls>
				{children}
				<PlayAnimation />
				<PauseAnimation />
				<CenteredPlayButton />
				<CenteredBottomPlayback />
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
