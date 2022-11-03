import { FC, ReactNode } from 'react';

import { useMediaStore } from '../../context';
import { useIsAudio } from '../../hooks';
import { useBottomControlsStyles } from '../bottom-controls/useBottomControlsStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useControlsStyles } from './useControlsStyles';

export interface ControlProps {
	children: ReactNode;
	className?: string;
}

/**
 * Wrapper that holds all the UI Components for Controls
 * @category React Component
 * @category UI Controls
 */
export const Controls: FC<ControlProps> = ({ children, className }) => {
	const isAudio = useIsAudio();
	const showControls = useMediaStore(state => state.showControls);

	// Controls styles
	const { classes, cx } = useControlsStyles();
	const classNameControls = cx(classes.controls, className);
	const {
		classes: { bottomControls },
	} = useBottomControlsStyles();

	// Only <ProgressBar/> should be present if Controls components are not shown
	if (!showControls && !isAudio) {
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
