import {
	Forward10Outlined,
	FullscreenOutlined,
	PictureInPictureAltOutlined,
	Replay10Outlined,
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { FC } from 'react';

import { toTimestamp } from '../../utils/time';

import {
	PlayPauseReplay,
	PlaybackRateButton,
	VolumeBarStyled,
	VolumeIcon,
} from './components';
import { useBottomControlPanelHook } from './useBottomControlPanelHook';
import { useBottomControlPanelStyles } from './useBottomControlPanelStyles';

const SECONDS_MULTIPLIER = 1000;

export interface BottomControlPanelProps {
	className?: string;
}

export const BottomControlPanel: FC<BottomControlPanelProps> = ({
	className,
}) => {
	const {
		currentTime,
		duration,
		playbackRate,
		volume,
		isFinished,
		isMuted,
		isPlaying,
		onFwd,
		onPlay,
		onRwd,
		onStop,
		onPip,
		onFullscreen,
		onSetPlaybackRate,
		onVolumeChange,
		onToggleClick,
	} = useBottomControlPanelHook();

	// Bottom panel styles
	const {
		wrapper,
		mediumIcons,
		mediumIconButtons,
		gridCentered,
		pipIcon,
		fullScreenIcon,
		timeStampText,
	} = useBottomControlPanelStyles().classes;

	return (
		<Grid
			container
			className={clsx(wrapper, className)}
			alignItems="center"
			justifyContent="space-between"
			direction="row"
		>
			<Grid item className={gridCentered} xs>
				<Grid item className={gridCentered} xs justifyContent="flex-start">
					{/*  Video Playing Statuses: Play-Pause-Replay */}
					<PlayPauseReplay
						isFinished={isFinished}
						isPlaying={isPlaying}
						onPlay={onPlay}
						onStop={onStop}
						onReplay={onPlay}
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
							onClick={onToggleClick}
						>
							<VolumeIcon volume={isMuted ? 0 : volume} />
						</IconButton>
						<VolumeBarStyled
							min={0}
							max={100}
							value={volume}
							size="small"
							onChange={onVolumeChange}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={gridCentered} xs justifyContent="center">
				{/* Current Time / Duration */}
				<Typography variant="body2" className={timeStampText} color="inherit">
					{toTimestamp(currentTime * SECONDS_MULTIPLIER)} /{' '}
					{toTimestamp(duration * SECONDS_MULTIPLIER)}
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
