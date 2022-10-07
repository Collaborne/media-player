import { IconButtonProps } from '@mui/material/IconButton';
import { FC } from 'react';

import { useMediaStore } from '../../context';
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
	const hasStarted = useMediaStore(state => state.hasPlayedOrSeeked);
	const play = useMediaStore(state => state.play);
	if (hasStarted) {
		return null;
	}

	console.log('RERENDER in CenteredPlayButton');

	return (
		<BigCenteredButton
			Icon={BigPlayIcon}
			onClick={play}
			classNames={classNames}
			iconButtonProps={iconButtonProps}
		/>
	);
};
