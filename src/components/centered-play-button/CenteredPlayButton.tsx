import { FC } from 'react';

import clsx from 'clsx';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { useCenteredPlayButtonStyles } from './useCenteredPlayButtonStyles';
import { BigPlayIcon } from '../icons/BigPlayIcon';

interface CenteredPlayButtonProps {
	onClick?: VoidFunction;
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

export const CenteredPlayButton: FC<CenteredPlayButtonProps> = ({
	onClick,
	classNames,
	iconButtonProps,
}) => {
	const { controlsWrapper, svgStyle } = useCenteredPlayButtonStyles();

	return (
		<div className={clsx(controlsWrapper, classNames)} onClick={onClick}>
			<IconButton {...iconButtonProps}>
				<BigPlayIcon className={svgStyle} />
			</IconButton>
		</div>
	);
};
