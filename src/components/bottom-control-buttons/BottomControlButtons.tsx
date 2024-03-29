import Grid from '@mui/material/Grid';
import { FC, memo, ReactNode } from 'react';

import { useIsAudio } from '../../hooks';
import { BOTTOM_CONTROL_BUTTONS } from '../../utils';

import { useBottomControlButtonsHook } from './useBottomControlButtonsHook';
import { useBottomControlButtonsStyles } from './useBottomControlButtonsStyles';

export interface BottomControlButtonsProps {
	className?: string;
	children: ReactNode;
	'data-testid'?: string;
}

/**
 * Wrapper that includes bottom controls buttons
 * @category React Component
 * @category UI Controls
 */
export const BottomControlButtons: FC<BottomControlButtonsProps> = memo(
	({
		className,
		children,
		'data-testid': dataTestId = BOTTOM_CONTROL_BUTTONS,
	}) => {
		const isAudio = useIsAudio();
		const { classes, cx } = useBottomControlButtonsStyles();

		const { hasStarted, showControls } = useBottomControlButtonsHook();

		if ((!showControls || !hasStarted) && !isAudio) {
			return null;
		}

		return (
			<Grid
				container
				className={cx(classes.wrapper, className)}
				alignItems="center"
				justifyContent="space-between"
				direction="row"
				data-testid={dataTestId}
			>
				{children}
			</Grid>
		);
	},
);
