import { Forward10, Replay10 } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';

import { useMediaStore } from '../../context';
import { useOnHoveredPipControlElement } from '../../hooks/use-on-hovered-element';
import { SECONDS_TO_SKIP } from '../../utils/constants';
import {
	PlayPauseReplay,
	PlaybackRateButton,
} from '../bottom-control-buttons/components';
import { BigPauseIcon } from '../icons/BigPauseIcon';
import { BigPlayIcon } from '../icons/BigPlayIcon';
import { BigReplayIcon } from '../icons/BigReplayIcon';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { usePipControlsHook } from './usePipControlsHook';
import { usePipControlsStyles } from './usePipControlsStyles';

interface PipControlsProps {
	skipSeconds?: number;
}

/**
 * Controls for the PIP player.
 * @category React Component
 * @category UI Controls
 */
export const PipControls: FC<PipControlsProps> = ({
	skipSeconds = SECONDS_TO_SKIP,
}) => {
	const showPipControls = useMediaStore(state => state.showPipControls);
	const { onMouseEnter, onMouseLeave } = useOnHoveredPipControlElement();
	const { onClose, onFwd, onRwd } = usePipControlsHook({
		skipSeconds,
	});
	const {
		wrapper,
		iconButton,
		iconRightWrapper,
		centerIcon,
		centerButtonIcon,
		playBackRateWrapper,
		progressBar,
	} = usePipControlsStyles().classes;

	if (!showPipControls) {
		return <ProgressBar className={progressBar} />;
	}
	return (
		<>
			<ProgressBar className={progressBar} />
			<div className={wrapper}>
				<Grid
					container
					alignItems="center"
					justifyContent="center"
					display="inline-flex"
				>
					<div>
						<IconButton
							onClick={onRwd}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							size="medium"
						>
							<Replay10 fontSize="medium" />
						</IconButton>
						<PlayPauseReplay
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
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
						<IconButton
							onClick={onFwd}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							size="medium"
						>
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
						onClick={onClose}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						color="primary"
						size="small"
						className={iconButton}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
					<PlaybackRateButton
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						className={playBackRateWrapper}
						variant="contained"
						size="small"
						color="primary"
					/>
				</Grid>
			</div>
		</>
	);
};
