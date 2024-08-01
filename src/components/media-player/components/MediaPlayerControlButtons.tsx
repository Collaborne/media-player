import Grid from '@mui/material/Grid';
import { FC, memo, ReactNode } from 'react';

import { useIsAudio, usePlayPauseReplayHook } from '../../../hooks';
import { BOTTOM_CONTROL_BUTTONS } from '../../../utils';
import { useBottomControlButtonsHook } from '../../bottom-control-buttons/useBottomControlButtonsHook';
import { useBottomControlButtonsStyles } from '../../bottom-control-buttons/useBottomControlButtonsStyles';

export interface MediaPlayerControlButtonsProps {
	className?: string;
	children: ReactNode;
	isCollapsed: boolean;
	'data-testid'?: string;
}

/**
 * Wrapper that includes media player bottom controls buttons
 * @category React Component
 * @category UI Controls
 */
export const MediaPlayerControlButtons: FC<MediaPlayerControlButtonsProps> =
	memo(
		({
			className,
			children,
			isCollapsed,
			'data-testid': dataTestId = BOTTOM_CONTROL_BUTTONS,
		}) => {
			const isAudio = useIsAudio();
			const { classes, cx } = useBottomControlButtonsStyles();
			const { hasStarted, showControls } = useBottomControlButtonsHook();
			const { isFinished } = usePlayPauseReplayHook();

			const hide = isCollapsed
				? !hasStarted || isFinished
				: (!showControls || !hasStarted) && !isAudio;

			if (hide) {
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
