import { IconButtonProps } from '@mui/material/IconButton';
import { FC } from 'react';
import { PiArrowCounterClockwiseFill } from 'react-icons/pi';

import { useIsAudio } from '../../hooks';
import { usePlayPauseReplayHook } from '../../hooks/use-play-pause-replay';
import { BigCenteredButton } from '../big-centered-button/BigCenteredButton';

export interface CenteredReplayButtonProps {
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

/**
 * @category React Component
 * @category UI Controls
 */
export const CenteredReplayButton: FC<CenteredReplayButtonProps> = ({
	classNames,
	iconButtonProps,
}) => {
	const isAudio = useIsAudio();
	const { onPlay, isFinished } = usePlayPauseReplayHook();
	if (!isFinished || isAudio) {
		return null;
	}

	return (
		<BigCenteredButton
			Icon={PiArrowCounterClockwiseFill}
			onClick={onPlay}
			classNames={classNames}
			iconButtonProps={iconButtonProps}
		/>
	);
};
