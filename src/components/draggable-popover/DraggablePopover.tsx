import { FC, memo, useMemo } from 'react';

import clsx from 'clsx';
import { Resizable, ResizableProps } from 're-resizable';
import Draggable, { DraggableProps } from 'react-draggable';
import Paper from '@mui/material/Paper';

import { useDraggablePopoverStyles } from './useDraggablePopoverStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';

export interface DraggablePopoverProps extends Partial<DraggableProps> {
	resizableProps?: Partial<ResizableProps>;
	className?: string;
}

export const DraggablePopover: FC<DraggablePopoverProps> = memo(
	({ className, children, ...props }) => {
		const { paper, progressBar } = useDraggablePopoverStyles();

		const resizingDirections = useMemo(
			() =>
				props.disabled
					? { top: false }
					: {
							top: true,
							left: true,
							right: true,
							topLeft: true,
					  },
			[props.disabled],
		);

		const size = useMemo(
			() =>
				props.disabled
					? { width: '100%', height: '100%' }
					: { width: '320px', height: 'auto' },
			[props.disabled],
		);

		const dragAxis = useMemo(
			() => (props.disabled ? { x: 0, y: 0 } : undefined),
			[props.disabled],
		);

		return (
			<Draggable {...props} allowAnyClick={false} position={dragAxis}>
				<Paper elevation={0} className={clsx(paper, className)}>
					<Resizable lockAspectRatio enable={resizingDirections} size={size}>
						{children}
						{!props.disabled && <ProgressBar className={progressBar} />}
					</Resizable>
				</Paper>
			</Draggable>
		);
	},
);
