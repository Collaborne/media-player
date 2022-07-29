import { Forward10, Replay10 } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { FC, useCallback, useEffect, useState } from 'react';

import { useVideo } from '../../hooks';
import { OVERLAY_HIDE_DELAY } from '../../utils/constants';
import {
	PlayPauseReplay,
	PlaybackRateButton,
} from '../bottom-control-panel/components';
import { useBottomControlPanelHook } from '../bottom-control-panel/useBottomControlPanelHook';
import { BigPauseIcon } from '../icons/BigPauseIcon';
import { BigPlayIcon } from '../icons/BigPlayIcon';
import { BigReplayIcon } from '../icons/BigReplayIcon';

import { usePipOverlayStyles } from './usePipOverlayStyles';

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
	} = usePipOverlayStyles().classes;
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

	const onClose = () => {
		onStop();
		api?.exitPip?.();
	};

	const onMouseMove = () => {
		markActivity?.();
		setLastMouseMove(Date.now());
	};

	const onMouseLeave = () => setLastMouseLeave(Date.now());

	const updateShowControls = useCallback(() => {
		const lastActivity = lastActivityRef?.current || 0;
		if (api?.getPaused?.()) {
			return setShowControls(true);
		}
		return setShowControls(Date.now() - lastActivity < OVERLAY_HIDE_DELAY);
		// Updating showControls should be on mouse move(stored here as a lastMouseLeave),
		// the video is paused(paused video has always controls on top)
		// or entering in PIP mode(we need to trigger creation of the new function)
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
						<Replay10 fontSize="medium" />
					</IconButton>
					<PlayPauseReplay
						isPlaying={isPlaying}
						isFinished={isFinished}
						onPlay={onPlay}
						onReplay={onPlay}
						onStop={onStop}
						className={centerButtonIcon}
						svgClassName={centerIcon}
						size="large"
						Icons={{
							Play: BigPlayIcon,
							Replay: BigReplayIcon,
							Pause: BigPauseIcon,
						}}
						svgIconSize="large"
					/>
					<IconButton size="medium" className={iconMiddle} onClick={onFwd}>
						<Forward10 fontSize="medium" />
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
					color="primary"
					size="small"
					className={iconButton}
					onClick={onClose}
				>
					<CloseIcon fontSize="small" />
				</IconButton>
				<PlaybackRateButton
					playbackRate={playbackRate}
					onChangeRate={onSetPlaybackRate}
					className={playBackRateWrapper}
					variant="contained"
					size="small"
					color="primary"
				/>
			</Grid>
		</div>
	);
};
