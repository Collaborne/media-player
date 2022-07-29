import { SvgIconProps } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import clsx from 'clsx';
import { ComponentType, FC } from 'react';

import { useBigCenteredButtonStyles } from './useBigCenteredButtonStyles';

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
	const { controlsWrapper, svgStyle } = useBigCenteredButtonStyles().classes;

	return (
		<div className={clsx(controlsWrapper, classNames)} onClick={onClick}>
			<IconButton {...iconButtonProps}>
				<Icon className={svgStyle} />
			</IconButton>
		</div>
	);
};
