import Paper from '@mui/material/Paper';
import Portal, { PortalProps } from '@mui/material/Portal';
import clsx from 'clsx';
import { FC } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';

import { PipOverlay } from '../pip-overlay/PipOverlay';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useDraggablePopoverHook } from './useDraggablePopoverHook';
import { useDraggablePopoverStyles } from './useDraggablePopoverStyles';

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

export const DraggablePopover: FC<DraggablePopoverProps> = ({
	className,
	children,
	rndProps,
	...props
}) => {
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
					minWidth={241}
					minHeight={146}
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
};

DraggablePopover.displayName = 'DraggablePopover';
