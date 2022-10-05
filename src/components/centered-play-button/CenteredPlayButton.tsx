import { IconButtonProps } from '@mui/material/IconButton';
import { FC } from 'react';

import { useVideoStore } from '../../context';
import { BigCenteredButton } from '../big-centered-button/BigCenteredButton';
import { BigPlayIcon } from '../icons/BigPlayIcon';

export interface CenteredPlayButtonProps {
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

export const CenteredPlayButton: FC<CenteredPlayButtonProps> = ({
	classNames,
	iconButtonProps,
}) => {
	const hasStarted = useVideoStore(state => state.hasPlayedOrSeeked);
	const play = useVideoStore(state => state.play);
	if (hasStarted) {
		return null;
	}
	return (
		<BigCenteredButton
			Icon={BigPlayIcon}
			onClick={play}
			classNames={classNames}
			iconButtonProps={iconButtonProps}
		/>
	);
};
