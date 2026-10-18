import Box from '@mui/material/Box';
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

import { useMediaStore } from '../../context/index.js';
import { useOnHoveredPipControlElement } from '../../hooks/use-on-hovered-element.js';
import { SECONDS_TO_SKIP } from '../../utils/constants.js';
import {
	PlayPauseReplay,
	PlaybackRateButton,
} from '../bottom-control-buttons/components/index.js';
import { ProgressBar } from '../progress-bar/ProgressBar.js';

import { usePipControlsHook } from './usePipControlsHook.js';
import { usePipControlsStyles } from './usePipControlsStyles.js';

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
				<Box
					sx={{
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
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
				</Box>
				<Box
					className={iconRightWrapper}
					sx={{
						display: 'inline-flex',
						flexDirection: 'column',
						alignItems: 'end',
					}}
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
				</Box>
			</div>
		</>
	);
};
