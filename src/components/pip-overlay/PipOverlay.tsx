import { FC, useCallback, useEffect, useState } from 'react';

import intl from 'react-intl-universal';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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
import { PipExitButton } from '../icons/PipExitIcon';

interface PipOverlayProps {}

export const PipOverlay: FC<PipOverlayProps> = () => {
	const {
		wrapper,
		iconButton,
		iconLeftWrapper,
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
		<Grid
			container
			justifyContent="space-between"
			className={wrapper}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
		>
			<Grid>
				<div className={iconLeftWrapper}>
					<IconButton
						color="inherit"
						size="small"
						className={iconButton}
						onClick={onClose}
					>
						<CloseIcon />
					</IconButton>
				</div>
			</Grid>
			<Grid
				item
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
			<Grid>
				<Grid
					item
					direction="column"
					display="inline-flex"
					className={iconRightWrapper}
				>
					<Tooltip
						title={intl.get('video.back_to_tab')}
						PopperProps={{ style: { zIndex: 9999 } }}
					>
						<IconButton
							size="small"
							color="inherit"
							className={iconButton}
							onClick={api?.exitPip}
						>
							<PipExitButton />
						</IconButton>
					</Tooltip>
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
			</Grid>
		</Grid>
	);
};
