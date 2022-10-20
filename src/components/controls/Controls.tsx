import { FC, ReactNode } from 'react';

import { useMediaStore } from '../../context';
import { useBottomControlsStyles } from '../bottom-controls/useBottomControlsStyles';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useControlsStyles } from './useControlsStyles';

export interface ControlProps {
	children: ReactNode;
}

export const Controls: FC<ControlProps> = ({ children }) => {
	const showControls = useMediaStore(state => state.showControls);
	// Controls styles
	const { controls } = useControlsStyles().classes;
	const { bottomControls } = useBottomControlsStyles().classes;

	// Only <ProgressBar/> should be present if Controls components are not shown
	if (!showControls) {
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
