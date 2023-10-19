import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';
import {
	PiX,
	PiArrowClockwise,
	PiArrowCounterClockwise,
	PiPlayCircleFill,
	PiArrowCounterClockwiseFill,
	PiPauseCircleFill,
} from 'react-icons/pi';

import { useMediaStore } from '../../context';
import { useOnHoveredPipControlElement } from '../../hooks/use-on-hovered-element';
import { SECONDS_TO_SKIP } from '../../utils/constants';
import {
	PlayPauseReplay,
	PlaybackRateButton,
} from '../bottom-control-buttons/components';
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
							<PiArrowCounterClockwise fontSize="medium" />
						</IconButton>
						<PlayPauseReplay
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							className={centerButtonIcon}
							svgClassName={centerIcon}
							size="large"
							Icons={{
								Play: PiPlayCircleFill,
								Replay: PiArrowCounterClockwiseFill,
								Pause: PiPauseCircleFill,
							}}
							svgIconSize="large"
						/>
						<IconButton
							onClick={onFwd}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							size="medium"
						>
							<PiArrowClockwise fontSize="medium" />
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
						<PiX fontSize="small" />
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
