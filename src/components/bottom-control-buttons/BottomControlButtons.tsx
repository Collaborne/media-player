import Grid from '@mui/material/Grid';
import clsx from 'clsx';
import { FC, memo, ReactNode } from 'react';

import { useIsAudio } from '../../hooks';

import { useBottomControlButtonsHook } from './useBottomControlButtonsHook';
import { useBottomControlButtonsStyles } from './useBottomControlButtonsStyles';

export interface BottomControlButtonsProps {
	className?: string;
	children: ReactNode;
}

/**
 * Wrapper that includes bottom controls buttons
 * @category React Component
 * @category UI Controls
 */
export const BottomControlButtons: FC<BottomControlButtonsProps> = memo(
	({ className, children }) => {
		const isAudio = useIsAudio();
		const { wrapper } = useBottomControlButtonsStyles({ isAudio }).classes;

		const { hasStarted, showControls } = useBottomControlButtonsHook();

		if ((!showControls || !hasStarted) && !isAudio) {
			return null;
		}

		return (
			<Grid
				container
				className={clsx(wrapper, className)}
				alignItems="center"
				justifyContent="space-between"
				direction="row"
				data-testid="bottom-control-panel"
			>
				{children}
			</Grid>
		);
	},
);
