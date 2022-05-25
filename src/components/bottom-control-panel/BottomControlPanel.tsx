import { FC, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
	Forward10Outlined,
	FullscreenOutlined,
	PictureInPictureAltOutlined,
	Replay10Outlined,
} from '@mui/icons-material';

import { useBottomControlPanelStyles } from './useBottomControlPanelStyles';
import {
	PlaybackRateButton,
	PlayPauseReplay,
	VolumeBarStyled,
	VolumeIcon,
} from './components';
import { toTimestamp } from '../../utils/time';
import { useVideo } from '../../hooks/use-video';

export interface BottomControlPanelProps {
	className?: string;
}

export const BottomControlPanel: FC<BottomControlPanelProps> = ({
	className,
}) => {
	const { api } = useVideo();

	const isPlaying = useMemo(
		() => Boolean(api?.getPlaying?.()),
		[api?.getPlaying],
	);
	const duration = useMemo(
		() => Number(api?.getDuration?.()),
		[api?.getDuration],
	);

	const relativeTime = useMemo(
		() => Number(api?.getCurrentRelativeTime?.()),
		[api?.getCurrentRelativeTime],
	);
	const currentTime = useMemo(
		() => Number(api?.getCurrentTime?.()),
		[api?.getCurrentTime],
	);
	const isFinished = useMemo(
		() => duration > 0 && !isPlaying && relativeTime >= duration,
		[duration, isPlaying, relativeTime],
	);

	const onPlay = useCallback(() => api?.play?.(), [api?.play]);
	const onStop = useCallback(() => api?.pause?.(), [api?.pause]);
	const onRwd = useCallback(
		() => api?.setCurrentTime?.(currentTime - 10),
		[api?.setCurrentTime, currentTime],
	);
	const onFwd = useCallback(
		() => api?.setCurrentTime?.(currentTime + 10),
		[api?.setCurrentTime, currentTime],
	);

	const volume = useMemo(
		() => (api?.getVolume?.() || 0) * 100,
		[api?.getVolume],
	);
	const isMuted = useMemo(() => Boolean(api?.getMuted?.()), [api?.getMuted]);
	const playbackRate = useMemo(
		() => api?.getPlaybackRate?.() || 1,
		[api?.getPlaybackRate],
	);

	const handleVolumeClick = useCallback(() => {
		if (isMuted) {
			return api?.unmute?.();
		}
		return api?.mute?.();
	}, [api?.mute, api?.unmute, isMuted]);

	const onVolumeChange = useCallback(
		(event: Event, value: number | number[], _activeThumb: number) => {
			event.preventDefault();
			if (Array.isArray(value)) {
				return;
			}
			api?.setVolume?.(value / 100);
		},
		[api?.setVolume, volume],
	);

	const onSetPlaybackRate = useCallback(
		(playbackRate: number) => {
			api?.setPlaybackRate?.(playbackRate);
		},
		[api?.setPlaybackRate],
	);

	const onPip = useCallback(
		() =>
			api?.getPictureInPicture?.() ? api?.exitPip?.() : api?.requestPip?.(),
		[api?.exitPip, api?.requestPip, api?.getPictureInPicture],
	);

	const onFullscreen = useCallback(
		() =>
			api?.getFullscreen?.()
				? api?.exitFullscreen?.()
				: api?.requestFullscreen?.(),
		[api?.getFullscreen, api?.exitFullscreen, api?.requestFullscreen],
	);

	// Bottom panel styles
	const {
		wrapper,
		mediumIcons,
		mediumIconButtons,
		gridCentered,
		pipIcon,
		fullScreenIcon,
		timeStampText,
	} = useBottomControlPanelStyles();

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
							onClick={handleVolumeClick}
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
					{toTimestamp(currentTime * 1000)} / {toTimestamp(duration * 1000)}
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
