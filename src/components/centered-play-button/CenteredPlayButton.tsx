import { IconButtonProps } from '@mui/material/IconButton';
import { FC, useCallback } from 'react';

import { useVideo } from '../../hooks/use-video';
import { BigCenteredButton } from '../big-centered-button/BigCenteredButton';
import { BigPlayIcon } from '../icons/BigPlayIcon';

export interface CenteredPlayButtonProps {
	onClick?: VoidFunction;
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

export const CenteredPlayButton: FC<CenteredPlayButtonProps> = ({
	onClick,
	classNames,
	iconButtonProps,
}) => {
	const { api } = useVideo();
	const onPlay = useCallback(() => {
		api?.play?.();
		onClick?.();
	}, [api, onClick]);

	return (
		<BigCenteredButton
			Icon={BigPlayIcon}
			onClick={onPlay}
			classNames={classNames}
			iconButtonProps={iconButtonProps}
		/>
	);
};
