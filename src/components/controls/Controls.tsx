import { FC, ReactNode } from 'react';

import { useMediaStore } from '../../context';
import { useIsAudio } from '../../hooks';
import { useBottomControlsStyles } from '../bottom-controls/useBottomControlsStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useControlsStyles } from './useControlsStyles';

export interface ControlProps {
	children: ReactNode;
	className?: string;
	/**
	 * In `<MediaPlayer />` - we always display a `<ProgressBar/>`(all controls can be hidden, except `<ProgressBar />`)
	 * This boolean will enforce do not to display all UI Controls(if it's the case)
	 */
	hideAllControls?: boolean;
}

/**
 * Wrapper that holds all the UI Components for Controls
 * @category React Component
 * @category UI Controls
 */
export const Controls: FC<ControlProps> = ({
	children,
	className,
	hideAllControls = false,
}) => {
	const isAudio = useIsAudio();
	const showControls = useMediaStore(state => state.showControls);

	// Controls styles
	const { classes, cx } = useControlsStyles();
	const classNameControls = cx(classes.controls, className);
	const {
		classes: { bottomControls },
	} = useBottomControlsStyles();

	if (!showControls && hideAllControls) {
		return null;
	}
	if (!showControls && !isAudio) {
		// Only <ProgressBar/> should be present if Controls components are not shown
		return (
			<div className={classNameControls}>
				<div className={bottomControls}>
					<ProgressBar />
				</div>
			</div>
		);
	}

	return <div className={classNameControls}>{children}</div>;
};
