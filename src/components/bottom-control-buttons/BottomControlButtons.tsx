import Grid from '@mui/material/Grid';
import clsx from 'clsx';
import { FC, memo, ReactNode } from 'react';

import { useBottomControlButtonsHook } from './useBottomControlButtonsHook';
import { useBottomControlButtonsStyles } from './useBottomControlButtonsStyles';

export interface BottomControlButtonsProps {
	className?: string;
	children: ReactNode;
}

export const BottomControlButtons: FC<BottomControlButtonsProps> = memo(
	({ className, children }) => {
		const { wrapper } = useBottomControlButtonsStyles().classes;

		const { hasStarted, showControls } = useBottomControlButtonsHook();

		console.log('BOTTOM CONTROLS RERENDER');

		if (!showControls || !hasStarted) {
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
