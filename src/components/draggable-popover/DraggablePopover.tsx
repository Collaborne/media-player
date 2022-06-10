import { FC, memo, useMemo } from 'react';

import clsx from 'clsx';
import { Resizable, ResizableProps } from 're-resizable';
import Draggable, { DraggableProps } from 'react-draggable';
import Paper from '@mui/material/Paper';

import { useDraggablePopoverStyles } from './useDraggablePopoverStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';
import Portal, { PortalProps } from '@mui/material/Portal';
import { DEFAULT_PIP_SIZE } from '../../utils/constants';
import { PipOverlay } from '../pip-overlay/PipOverlay';

export type ContainerSizePosition = {
	width: number;
	height: number;
	left: number;
	top: number;
};
export interface DraggablePopoverProps extends PortalProps {
	resizableProps?: Partial<ResizableProps>;
	draggableProps?: Partial<DraggableProps>;
	className?: string;
}

const SCROLLBAR_SIZE = 28;
const POPOVER_MARGIN = 16;

export const DraggablePopover: FC<DraggablePopoverProps> = memo(
	({ resizableProps, draggableProps, className, children, ...props }) => {
		const { paper, progressBar, portalWrapper } = useDraggablePopoverStyles({
			isExpanded: Boolean(props.disablePortal),
		});

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

		// Get current wrapper position, and calculate it distance until the vw finished -16px
		const defaultPosition = useMemo((): DraggableProps['defaultPosition'] => {
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			if (!props.disablePortal) {
				return {
					y: vh - SCROLLBAR_SIZE - POPOVER_MARGIN - DEFAULT_PIP_SIZE.height,
					x: vw - SCROLLBAR_SIZE - POPOVER_MARGIN - DEFAULT_PIP_SIZE.width,
				};
			}

			return { x: 0, y: 0 };
		}, [props.disablePortal]);

		return (
			<Portal {...props}>
				<div className={portalWrapper}>
					<Draggable
						{...draggableProps}
						positionOffset={defaultPosition}
						allowAnyClick
						disabled={props.disablePortal}
					>
						<Paper elevation={0} className={clsx(paper, className)}>
							<Resizable
								{...resizableProps}
								enable={enableResizing}
								defaultSize={defaultSize}
								lockAspectRatio
							>
								{children}
								{!props.disablePortal && (
									<>
										<PipOverlay />
										<ProgressBar className={progressBar} />
									</>
								)}
							</Resizable>
						</Paper>
					</Draggable>
				</div>
			</Portal>
		);
	},
);
