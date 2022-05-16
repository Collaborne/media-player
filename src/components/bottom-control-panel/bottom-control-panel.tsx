import { FC, useCallback } from 'react';
import {
	Forward10Outlined,
	FullscreenOutlined,
	PictureInPictureAltOutlined,
	Replay10Outlined,
} from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useBottomControlPanel } from './bottom-control-panel.styles';
import { VolumeIcon } from './volume-icon';
import { VolumeBarStyled } from './volume-slider.styled';
import { toTimestamp } from '../../utils/time';
import { PlaybackRateButton } from './playback-rate';
import { PlayPauseReplay } from './play-pause-replay-buttons';

interface BottomControlPanelProps {
	isFinished: boolean;
	isPlaying: boolean;
	volume: number;
	playbackRate: number;
	onPlay: VoidFunction;
	onStop: VoidFunction;
	onReplay: VoidFunction;
	onFwd: VoidFunction;
	onRwd: VoidFunction;
	onVolumeChange: VoidFunction;
	onSetPlaybackRate: (playbackRate: number) => void;
	onPip: VoidFunction;
	onFullscreen: VoidFunction;
}
// Add clicks on volume with muting/unmuting

export const BottomControlPanel: FC<BottomControlPanelProps> = props => {
	const {
		isPlaying,
		isFinished,
		volume,
		playbackRate,
		onSetPlaybackRate,
		onFullscreen,
		onFwd,
		onRwd,
		onPip,
		onPlay,
		onStop,
		onReplay,
		onVolumeChange,
	} = props;
	const {
		wrapper,
		mediumIcons,
		mediumIconButtons,
		gridCentered,
		pipIcon,
		fullScreenIcon,
	} = useBottomControlPanel();

	// Udpate callback when store is added
	const handleVolumeClick = useCallback(
		() => onVolumeChange(),
		[onVolumeChange],
	);

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
					{/* Formward Button */}
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
						<VolumeBarStyled
							size="small"
							color="secondary"
							onChange={onVolumeChange}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={gridCentered} xs justifyContent="center">
				<Typography variant="subtitle2" color={'white'}>
					{toTimestamp(6000)} / {toTimestamp(6500000)}
				</Typography>
			</Grid>
			<Grid item className={gridCentered} xs justifyContent="flex-end">
				<PlaybackRateButton
					playbackRate={playbackRate}
					onChangeRate={onSetPlaybackRate}
					className={mediumIconButtons}
				/>
				<IconButton size="medium" className={mediumIconButtons} onClick={onPip}>
					<PictureInPictureAltOutlined className={pipIcon} />
				</IconButton>
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
