import { FC, memo, useMemo, useRef } from 'react';

import clsx from 'clsx';
import { Resizable, ResizableProps } from 're-resizable';
import Draggable, { DraggableProps } from 'react-draggable';
import Paper from '@mui/material/Paper';

import { useDraggablePopoverStyles } from './useDraggablePopoverStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';
import Portal, { PortalProps } from '@mui/material/Portal';
import { DEFAULT_PIP_SIZE } from '../../utils/constants';

export interface DraggablePopoverProps extends PortalProps {
	resizableProps?: Partial<ResizableProps>;
	draggableProps?: Partial<DraggableProps>;
	className?: string;
}

export const DraggablePopover: FC<DraggablePopoverProps> = memo(
	({ resizableProps, draggableProps, className, children, ...props }) => {
		const { paper, progressBar } = useDraggablePopoverStyles({
			isExpanded: Boolean(props.disablePortal),
		});
		const paperRef = useRef<HTMLDivElement>(null);
		/** Disable Resizing events when  *portal mode* is disabled */
		const enableResizing = useMemo(
			(): ResizableProps['enable'] =>
				props.disablePortal
					? {}
					: {
							bottomLeft: true,
							bottomRight: true,
							topLeft: true,
							topRight: true,
					  },
			[props.disablePortal],
		);

		const defaultSize = useMemo(
			(): ResizableProps['defaultSize'] =>
				props.disablePortal
					? { width: '100%', height: '100%' }
					: DEFAULT_PIP_SIZE,
			[props.disablePortal],
		);
		// TODO: fix sizes!
		// Get current wrapper position, and calculate it distance until the vw finished -16px
		const defaultPosition = useMemo((): DraggableProps['defaultPosition'] => {
			const vw = window.innerWidth || 0;

			const vh = window.innerHeight;

			if (!props.disablePortal)
				return {
					x: vw,
					y: vh,
				};

			return { x: 0, y: 0 };
		}, [props.disablePortal]);

		console.log(defaultPosition);
		return (
			<Portal {...props}>
				<Draggable {...draggableProps} positionOffset={defaultPosition}>
					<Paper
						elevation={0}
						className={clsx(paper, className)}
						ref={paperRef}
					>
						<Resizable
							{...resizableProps}
							enable={enableResizing}
							defaultSize={defaultSize}
							lockAspectRatio
						>
							{children}
							{!props.disablePortal && <ProgressBar className={progressBar} />}
						</Resizable>
					</Paper>
				</Draggable>
			</Portal>
		);
	},
);
