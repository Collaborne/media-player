import { SvgIconProps } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { ComponentType, FC } from 'react';

import { useBigCenteredButtonStyles } from './useBigCenteredButtonStyles';

export interface BigCenteredButtonProps {
	Icon: ComponentType<SvgIconProps>;
	onClick?: VoidFunction;
	classNames?: string;
	iconButtonProps?: IconButtonProps & { 'data-testid'?: string };
}

/**
 * A component that adds a big centered icon button with corresponding styles and backdrop
 * @category React Component
 */
export const BigCenteredButton: FC<BigCenteredButtonProps> = ({
	onClick,
	classNames,
	iconButtonProps,
	Icon,
}) => {
	const { classes, cx } = useBigCenteredButtonStyles();

	return (
		<div className={cx(classes.controlsWrapper, classNames)} onClick={onClick}>
			<IconButton className={classes.button} {...iconButtonProps}>
				<Icon className={classes.svgStyle} />
			</IconButton>
		</div>
	);
};
