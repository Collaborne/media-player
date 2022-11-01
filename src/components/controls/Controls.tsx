import { FC, ReactNode } from 'react';

import { useMediaStore } from '../../context';
import { useIsAudio } from '../../hooks';
import { useBottomControlsStyles } from '../bottom-controls/useBottomControlsStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useControlsStyles } from './useControlsStyles';

export interface ControlProps {
	children: ReactNode;
}

/**
 * Wrapper that holds all the UI Components for Controls
 * @category React Component
 * @category UI Controls
 */
export const Controls: FC<ControlProps> = ({ children }) => {
	const isAudio = useIsAudio();
	const showControls = useMediaStore(state => state.showControls);

	// Controls styles
	const { controls } = useControlsStyles({ isAudio }).classes;
	const { bottomControls } = useBottomControlsStyles().classes;

	// Only <ProgressBar/> should be present if Controls components are not shown
	if (!showControls && !isAudio) {
		return (
			<div className={controls}>
				<div className={bottomControls}>
					<ProgressBar />
				</div>
			</div>
		);
	}

	return <div className={controls}>{children}</div>;
};
