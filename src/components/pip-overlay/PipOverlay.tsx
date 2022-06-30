import { FC, useCallback, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Forward10, Replay10 } from '@mui/icons-material';

import { usePipOverlayStyles } from './usePipOverlayStyles';
import { useVideo } from '../../hooks';
import { OVERLAY_HIDE_DELAY } from '../../utils/constants';

import {
	PlaybackRateButton,
	PlayPauseReplay,
} from '../bottom-control-panel/components';
import { useBottomControlPanelHook } from '../bottom-control-panel/useBottomControlPanelHook';
import { BigPlayIcon } from '../icons/BigPlayIcon';
import { BigReplayIcon } from '../icons/BigReplayIcon';
import { BigPauseIcon } from '../icons/BigPauseIcon';

interface PipOverlayProps {}

export const PipOverlay: FC<PipOverlayProps> = () => {
	const {
		wrapper,
		iconButton,
		iconRightWrapper,
		iconMiddle,
		centerIcon,
		centerButtonIcon,
		playBackRateWrapper,
		playbackTypography,
	} = usePipOverlayStyles();
	const [showControls, setShowControls] = useState(true);
	const [lastMouseLeave, setLastMouseLeave] = useState<number>(0);
	const [lastMouseMove, setLastMouseMove] = useState<number>(0);

	const { api, lastActivityRef, markActivity } = useVideo();
	const {
		isPlaying,
		isFinished,
		onPlay,
		onRwd,
		onFwd,
		onStop,
		onSetPlaybackRate,
		playbackRate,
	} = useBottomControlPanelHook();

	const onClose = useCallback(() => {
		onStop();
		api?.exitPip?.();
	}, [api?.exitPip, onStop]);

	const onMouseMove = useCallback(() => {
		markActivity?.();
		setLastMouseMove(Date.now());
	}, [markActivity]);

	const onMouseLeave = useCallback(() => setLastMouseLeave(Date.now()), []);

	const updateShowControls = useCallback(() => {
		const lastActivity = lastActivityRef?.current || 0;
		if (api?.getPaused?.()) {
			return setShowControls(true);
		}
		return setShowControls(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
	}, [lastMouseLeave, api?.getPaused, api?.getPictureInPicture]);

	useEffect(updateShowControls, [
		updateShowControls,
		showControls,
		isPlaying,
		lastMouseMove,
	]);

	// Updating video players bottom control's panel after OVERLAY_HIDE_DELAY time period
	useEffect(() => {
		if (!isPlaying) {
			return;
		}
		const timeoutId = setTimeout(updateShowControls, OVERLAY_HIDE_DELAY + 100);
		return () => clearTimeout(timeoutId);
	}, [updateShowControls, lastMouseMove, isPlaying]);

	if (!showControls) {
		return null;
	}

	return (
		<div
			className={wrapper}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
		>
			<Grid
				container
				alignItems="center"
				justifyContent="center"
				display="inline-flex"
			>
				<div>
					<IconButton size="medium" className={iconMiddle} onClick={onRwd}>
						<Replay10 />
					</IconButton>
					<PlayPauseReplay
						isPlaying={isPlaying}
						isFinished={isFinished}
						onPlay={onPlay}
						onReplay={onPlay}
						onStop={onStop}
						className={centerButtonIcon}
						svgClassName={centerIcon}
						Icons={{
							Play: BigPlayIcon,
							Replay: BigReplayIcon,
							Pause: BigPauseIcon,
						}}
					/>
					<IconButton size="medium" className={iconMiddle} onClick={onFwd}>
						<Forward10 />
					</IconButton>
				</div>
			</Grid>
			<Grid
				container
				direction="column"
				display="inline-flex"
				className={iconRightWrapper}
				alignItems="end"
			>
				<IconButton
					color="inherit"
					size="small"
					className={iconButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
				<PlaybackRateButton
					playbackRate={playbackRate}
					onChangeRate={onSetPlaybackRate}
					className={playBackRateWrapper}
					typographyProps={{
						variant: 'caption',
						className: playbackTypography,
					}}
				/>
			</Grid>
		</div>
	);
};
