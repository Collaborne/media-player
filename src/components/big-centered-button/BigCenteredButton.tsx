import { ComponentType, FC, useCallback } from 'react';

import clsx from 'clsx';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { useBigCenteredButtonStyles } from './useBigCenteredButtonStyles';
import { SvgIconProps } from '@mui/material';

export interface BigCenteredButtonProps {
	Icon: ComponentType<SvgIconProps>;
	onClick?: VoidFunction;
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

/**
 * A component that adds a big centered icon button with corresponding styles and backdrop
 */
export const BigCenteredButton: FC<BigCenteredButtonProps> = ({
	onClick,
	classNames,
	iconButtonProps,
	Icon,
}) => {
	const { controlsWrapper, svgStyle } = useBigCenteredButtonStyles();
	const handleClick = useCallback(() => {
		onClick?.();
	}, [onClick]);

	return (
		<div className={clsx(controlsWrapper, classNames)} onClick={handleClick}>
			<IconButton {...iconButtonProps}>
				<Icon className={svgStyle} />
			</IconButton>
		</div>
	);
};
