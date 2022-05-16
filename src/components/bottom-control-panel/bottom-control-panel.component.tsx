import { FC } from 'react';
import {
	Forward10Outlined,
	PauseOutlined,
	PlayArrow,
	Replay10Outlined,
	ReplayOutlined,
} from '@mui/icons-material';
import { Grid, IconButton, Slider } from '@mui/material';
import { useBottomControlPanel } from './bottom-control-panel.styles';
import { createVolumeIcon } from './utils/create-volume-icon';

interface BottomControlPanelProps {
	isFinished: boolean;
	isPlaying: boolean;
	volume: number;
	playbackRate: number;
	onPlay: VoidFunction;
	onStop: VoidFunction;
	onPlayFromStart: VoidFunction;
	onFwd: VoidFunction;
	onRwd: VoidFunction;
	onVolumeChange: VoidFunction;
	onSetPlaybackRate: VoidFunction;
	onPip: VoidFunction;
	onFullscreen: VoidFunction;
}

export const BottomControlPanel: FC<BottomControlPanelProps> = props => {
	const {
		isPlaying,
		isFinished,
		volume,
		// onFullscreen,
		// onFwd,
		// onPip,
		// onPlay,
		// onRwd,
		// onSetPlaybackRate,
		// onStop,
		// onVolumeChange,
		// playbackRate,
	} = props;
	const { wrapper } = useBottomControlPanel();

	return (
		<Grid container className={wrapper} alignItems="center">
			<Grid container direction="row" justifyContent="space-between">
				<Grid container>
					{/*  Video Playing Statuses: Play-Pause-Replay */}
					<IconButton size="medium">
						{isFinished ? (
							<ReplayOutlined />
						) : isPlaying ? (
							<PauseOutlined />
						) : (
							<PlayArrow />
						)}
					</IconButton>
					{/* Rewind Button */}
					<IconButton size="medium">
						<Replay10Outlined />
					</IconButton>
					{/* Formward Button */}
					<IconButton size="medium">
						<Forward10Outlined />
					</IconButton>
					{/* Volume Slider */}
					{createVolumeIcon(volume)}
					<Slider min={0} max={100} value={volume} />
				</Grid>
			</Grid>
		</Grid>
	);
};
