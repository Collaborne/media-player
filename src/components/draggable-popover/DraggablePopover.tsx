import Paper from '@mui/material/Paper';
import Portal, { PortalProps } from '@mui/material/Portal';
import { FC } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';

import { useMediaStore } from '../../context';
import { useIsAudio } from '../../hooks';
import { usePipControlsContext } from '../../hooks/use-pip-controls-context';
import { MediaPoster } from '../media-poster/MediaPoster';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useDraggablePopoverHook } from './useDraggablePopoverHook';
import { useDraggablePopoverStyles } from './useDraggablePopoverStyles';
import { usePipMouseActivityHook } from './usePipMouseActivity';

export type ContainerSizePosition = {
	width: number;
	height: number;
	left: number;
	top: number;
};
export interface DraggablePopoverProps extends PortalProps {
	rndProps?: RndProps;
	className?: string;
	audioPlaceholder?: string;
}

/**
 * Popover/Portal component that is responsible for PIP logic and UI
 * @category React Component
 * @category UI Controls
 */
export const DraggablePopover: FC<DraggablePopoverProps> = ({
	className,
	children,
	rndProps,
	audioPlaceholder,
	...props
}) => {
	const { PIPControls } = usePipControlsContext();
	const isAudio = useIsAudio();
	const isPip = useMediaStore(state => state.isPip);
	const { defaultPosition, defaultWidth, enableResizing } =
		useDraggablePopoverHook({ disablePortal: props.disablePortal });
	const { onMouseEnter, onMouseLeave, onMouseMove } = usePipMouseActivityHook();

	const {
		classes: { paper, progressBar, portalWrapper, resizeSquares },
		cx,
	} = useDraggablePopoverStyles({
		isExpanded: Boolean(props.disablePortal),
		isAudio,
		isPip,
	});

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
					<Paper
						elevation={0}
						className={cx(paper, className)}
						onMouseMove={onMouseMove}
						onMouseLeave={onMouseLeave}
						onMouseEnter={onMouseEnter}
					>
						{children}
						{!props.disablePortal && (
							<>
								{isAudio && (
									<MediaPoster
										img={audioPlaceholder}
										width="100%"
										height="100%"
									/>
								)}
								<PIPControls />
								<ProgressBar className={progressBar} />
							</>
						)}
					</Paper>
				</Rnd>
			</div>
		</Portal>
	);
};
