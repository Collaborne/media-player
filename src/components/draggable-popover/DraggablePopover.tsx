import { FC, memo, useState } from 'react';

import clsx from 'clsx';
import { Resizable, ResizableProps } from 're-resizable';
import Draggable, { DraggableProps } from 'react-draggable';
import Paper from '@mui/material/Paper';

import { useDraggablePopoverStyles } from './useDraggablePopoverStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';
import Portal, { PortalProps } from '@mui/material/Portal';
import { PipOverlay } from '../pip-overlay/PipOverlay';
import { useDraggablePopoverHook } from './useDraggablePopoverHook';
import { Position, ResizableDelta, Rnd } from 'react-rnd';
import { DEFAULT_PIP_SIZE } from '../../utils/constants';

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

export const DraggablePopover: FC<DraggablePopoverProps> = memo(
	({ resizableProps, draggableProps, className, children, ...props }) => {
		const { defaultPosition, defaultWidth, enableResizing } =
			useDraggablePopoverHook({ disablePortal: props.disablePortal });

		const { paper, progressBar, portalWrapper } = useDraggablePopoverStyles({
			isExpanded: Boolean(props.disablePortal),
		});

		return (
			<Portal {...props}>
				<div className={portalWrapper}>
					<Rnd
						bounds="parent"
						style={{ width: 'unset', height: 'unset' }}
						default={{
							...defaultPosition,
							...defaultWidth,
						}}
						disableDragging={props.disablePortal}
						// enableResizing={enableResizing}
						lockAspectRatio
					>
						<Paper elevation={0} className={clsx(paper, className)}>
							{children}
							{!props.disablePortal && (
								<>
									<PipOverlay />
									<ProgressBar className={progressBar} />
								</>
							)}
						</Paper>
					</Rnd>
				</div>
			</Portal>
		);
	},
);
DraggablePopover.displayName = 'DraggablePopover';
