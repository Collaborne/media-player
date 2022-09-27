import { IconButtonProps } from '@mui/material/IconButton';
import { FC } from 'react';

import { usePlayPauseReplayHook } from '../../hooks/use-play-pause-replay';
import { BigCenteredButton } from '../big-centered-button/BigCenteredButton';
import { BigReplayIcon } from '../icons/BigReplayIcon';

export interface CenteredReplayButtonProps {
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

export const CenteredReplayButton: FC<CenteredReplayButtonProps> = ({
	classNames,
	iconButtonProps,
}) => {
	const { onPlay, isFinished } = usePlayPauseReplayHook();
	if (!isFinished) {
		return null;
	}

	return (
		<BigCenteredButton
			Icon={BigReplayIcon}
			onClick={onPlay}
			classNames={classNames}
			iconButtonProps={iconButtonProps}
		/>
	);
};
