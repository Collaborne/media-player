import { FC, useCallback } from 'react';

import { IconButtonProps } from '@mui/material/IconButton';

import { useVideo } from '../../hooks/use-video';
import { BigCenteredButton } from '../big-centered-button/BigCenteredButton';
import { BigReplayIcon } from '../icons/BigReplayIcon';

export interface CenteredReplayButtonProps {
	onClick?: VoidFunction;
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

export const CenteredReplayButton: FC<CenteredReplayButtonProps> = ({
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
			Icon={BigReplayIcon}
			onClick={onPlay}
			classNames={classNames}
			iconButtonProps={iconButtonProps}
		/>
	);
};
