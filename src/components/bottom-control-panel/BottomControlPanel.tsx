import { FC, useCallback } from 'react';

import {
	Forward10Outlined,
	FullscreenOutlined,
	PictureInPictureAltOutlined,
	Replay10Outlined,
} from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';

import { useBottomControlPanelStyles } from './useBottomControlPanelStyles';
import {
	PlaybackRateButton,
	PlayPauseReplay,
	VolumeBarStyled,
	VolumeIcon,
} from './components';
import { toTimestamp } from '../../utils/time';

export interface BottomControlPanelProps {
	isFinished: boolean;
	isPlaying: boolean;
	volume: number;
	playbackRate: number;
	duration: number;
	currentTime: number;
	onPlay: VoidFunction;
	onStop: VoidFunction;
	onReplay: VoidFunction;
	onFwd: VoidFunction;
	onRwd: VoidFunction;
	onVolumeChange: VoidFunction;
	onSetPlaybackRate: (playbackRate: number) => void;
	onPip: VoidFunction;
	onFullscreen: VoidFunction;
	onMute: VoidFunction;
}

export const BottomControlPanel: FC<BottomControlPanelProps> = ({
	isPlaying,
	isFinished,
	volume,
	playbackRate,
	currentTime,
	duration,
	onSetPlaybackRate,
	onFullscreen,
	onFwd,
	onRwd,
	onPip,
	onPlay,
	onStop,
	onReplay,
	onMute,
	onVolumeChange,
}) => {
	const {
		wrapper,
		mediumIcons,
		mediumIconButtons,
		gridCentered,
		pipIcon,
		fullScreenIcon,
		timeStampText,
	} = useBottomControlPanelStyles();

	// Update callback when store is added
	const handleVolumeClick = useCallback(() => onMute(), [onMute]);

	return (
		<Grid
			container
			className={wrapper}
			alignItems="center"
			justifyContent="space-between"
		>
			<Grid item direction="row" height="100%">
				<Grid item className={gridCentered} xs>
					{/*  Video Playing Statuses: Play-Pause-Replay */}
					<PlayPauseReplay
						isFinished={isFinished}
						isPlaying={isPlaying}
						onPlay={onPlay}
						onStop={onStop}
						onReplay={onReplay}
					/>
					{/* Rewind Button */}
					<IconButton
						size="medium"
						className={mediumIconButtons}
						onClick={onRwd}
					>
						<Replay10Outlined className={mediumIcons} />
					</IconButton>
					{/* Forward Button */}
					<IconButton
						size="medium"
						className={mediumIconButtons}
						onClick={onFwd}
					>
						<Forward10Outlined className={mediumIcons} />
					</IconButton>
					{/* Volume Slider */}
					<Grid className={gridCentered}>
						<IconButton
							size="medium"
							className={mediumIconButtons}
							onClick={handleVolumeClick}
						>
							<VolumeIcon volume={volume} />
						</IconButton>
						<VolumeBarStyled size="small" onChange={onVolumeChange} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={gridCentered} xs justifyContent="center">
				{/* Current Time / Duration */}
				<Typography variant="body2" className={timeStampText} color="inherit">
					{toTimestamp(currentTime)} / {toTimestamp(duration)}
				</Typography>
			</Grid>
			<Grid item className={gridCentered} xs justifyContent="flex-end">
				{/* Playback Rate */}
				<PlaybackRateButton
					playbackRate={playbackRate}
					onChangeRate={onSetPlaybackRate}
					className={mediumIconButtons}
				/>
				{/* Picture In Picture */}
				<IconButton size="medium" className={mediumIconButtons} onClick={onPip}>
					<PictureInPictureAltOutlined className={pipIcon} />
				</IconButton>
				{/* Fullscreen mode */}
				<IconButton
					size="medium"
					className={mediumIconButtons}
					onClick={onFullscreen}
				>
					<FullscreenOutlined className={fullScreenIcon} />
				</IconButton>
			</Grid>
		</Grid>
	);
};
