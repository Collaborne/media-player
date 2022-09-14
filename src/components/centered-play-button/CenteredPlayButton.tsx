import { IconButtonProps } from '@mui/material/IconButton';
import { FC } from 'react';

import { useVideo } from '../../hooks/use-video';
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
	const { api } = useVideo();

	const hasStarted = api?.getHasPlayedOrSeeked?.();
	if (hasStarted) {
		return null;
	}
	return (
		<BigCenteredButton
			Icon={BigPlayIcon}
			onClick={api?.play}
			classNames={classNames}
			iconButtonProps={iconButtonProps}
		/>
	);
};
