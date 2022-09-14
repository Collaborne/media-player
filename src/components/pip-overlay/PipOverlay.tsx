import { Forward10, Replay10 } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';

import { useVideo } from '../../hooks';
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
	const { api } = useVideo();
	const isVisible = api?.getShowPipControls?.();

	const {
		wrapper,
		iconButton,
		iconRightWrapper,
		centerIcon,
		centerButtonIcon,
		playBackRateWrapper,
	} = usePipOverlayStyles().classes;

	const { onRwd, onFwd, onStop } = useBottomControlPanelHook();

	const onClose = () => {
		onStop();
		api?.exitPip?.();
	};

	if (!isVisible) {
		return null;
	}
	return (
		<div className={wrapper}>
			<Grid
				container
				alignItems="center"
				justifyContent="center"
				display="inline-flex"
			>
				<div>
					<IconButton size="medium" onClick={onRwd}>
						<Replay10 fontSize="medium" />
					</IconButton>
					<PlayPauseReplay
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
					<IconButton size="medium" onClick={onFwd}>
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
					className={playBackRateWrapper}
					variant="contained"
					size="small"
					color="primary"
				/>
			</Grid>
		</div>
	);
};
