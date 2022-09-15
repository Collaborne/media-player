import { Forward10, Replay10 } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';

import { SECONDS_TO_SKIP } from '../../utils/constants';
import {
	PlayPauseReplay,
	PlaybackRateButton,
} from '../bottom-control-buttons/components';
import { BigPauseIcon } from '../icons/BigPauseIcon';
import { BigPlayIcon } from '../icons/BigPlayIcon';
import { BigReplayIcon } from '../icons/BigReplayIcon';

import { usePipControlsHook } from './usePipControlsHook';
import { usePipControlsStyles } from './usePipControlsStyles';

interface PipControlsProps {
	skipSeconds?: number;
}

export const PipControls: FC<PipControlsProps> = ({
	skipSeconds = SECONDS_TO_SKIP,
}) => {
	const { showPipControls, onClose, onFwd, onRwd } = usePipControlsHook({
		skipSeconds,
	});
	const {
		wrapper,
		iconButton,
		iconRightWrapper,
		centerIcon,
		centerButtonIcon,
		playBackRateWrapper,
	} = usePipControlsStyles().classes;

	if (!showPipControls) {
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
