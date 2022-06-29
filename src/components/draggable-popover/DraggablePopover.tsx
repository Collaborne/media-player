import { FC, memo } from 'react';

import clsx from 'clsx';
import Paper from '@mui/material/Paper';

import { useDraggablePopoverStyles } from './useDraggablePopoverStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';
import Portal, { PortalProps } from '@mui/material/Portal';
import { PipOverlay } from '../pip-overlay/PipOverlay';
import { useDraggablePopoverHook } from './useDraggablePopoverHook';
import { Rnd, Props as RndProps } from 'react-rnd';

export type ContainerSizePosition = {
	width: number;
	height: number;
	left: number;
	top: number;
};
export interface DraggablePopoverProps extends PortalProps {
	rndProps?: RndProps;
	className?: string;
}

export const DraggablePopover: FC<DraggablePopoverProps> = memo(
	({ className, children, rndProps, ...props }) => {
		const { defaultPosition, defaultWidth, enableResizing } =
			useDraggablePopoverHook({ disablePortal: props.disablePortal });

		const { paper, progressBar, portalWrapper, resizeSquares } =
			useDraggablePopoverStyles({
				isExpanded: Boolean(props.disablePortal),
			}).classes;

		return (
			<Portal {...props}>
				<div className={portalWrapper}>
					<Rnd
						bounds="parent"
						default={{
							...defaultPosition,
							...defaultWidth,
						}}
						disableDragging={props.disablePortal}
						enableResizing={enableResizing}
						lockAspectRatio
						allowAnyClick
						resizeHandleClasses={{
							topLeft: resizeSquares,
							topRight: resizeSquares,
							bottomLeft: resizeSquares,
							bottomRight: resizeSquares,
						}}
						{...rndProps}
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
