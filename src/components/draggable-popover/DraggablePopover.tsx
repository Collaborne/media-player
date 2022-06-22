import { FC, memo } from 'react';

import clsx from 'clsx';
import { Resizable, ResizableProps } from 're-resizable';
import Draggable, { DraggableProps } from 'react-draggable';
import Paper from '@mui/material/Paper';

import { useDraggablePopoverStyles } from './useDraggablePopoverStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';
import Portal, { PortalProps } from '@mui/material/Portal';
import { PipOverlay } from '../pip-overlay/PipOverlay';
import { useDraggablePopoverHook } from './useDraggablePopoverHook';

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
		const {
			bounds,
			defaultPosition,
			defaultSize,
			enableResizing,
			resizeStopHandler,
			pipPlayerSize,
		} = useDraggablePopoverHook({ disablePortal: props.disablePortal });

		const { paper, progressBar, portalWrapper } = useDraggablePopoverStyles({
			isExpanded: Boolean(props.disablePortal),
		}).classes;

		return (
			<Portal {...props}>
				<div className={portalWrapper}>
					<Draggable
						{...draggableProps}
						positionOffset={defaultPosition}
						allowAnyClick
						disabled={props.disablePortal}
						bounds={bounds}
					>
						<Paper elevation={0} className={clsx(paper, className)}>
							<Resizable
								{...resizableProps}
								enable={enableResizing}
								defaultSize={defaultSize}
								lockAspectRatio
								size={!enableResizing ? pipPlayerSize : undefined}
								onResizeStop={resizeStopHandler}
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
