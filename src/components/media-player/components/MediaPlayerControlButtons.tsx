import Box from '@mui/material/Box';
import { FC, memo, ReactNode } from 'react';

import { useIsAudio } from '../../../hooks/index.js';
import { BOTTOM_CONTROL_BUTTONS } from '../../../utils/index.js';
import { useBottomControlButtonsHook } from '../../bottom-control-buttons/useBottomControlButtonsHook.js';
import { useBottomControlButtonsStyles } from '../../bottom-control-buttons/useBottomControlButtonsStyles.js';

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
			const { showControls } = useBottomControlButtonsHook();

			const hide = !isCollapsed && !showControls && !isAudio;

			if (hide) {
				return null;
			}

			return (
				<Box
					className={cx(classes.wrapper, className)}
					sx={{
						display: 'flex',
						alignItems: 'stretch',
						justifyContent: 'flex-start',
						flexDirection: 'column',
					}}
					data-testid={dataTestId}
				>
					{children}
				</Box>
			);
		},
	);
