import { FC } from 'react';

import { BottomControlPanel } from '../bottom-control-panel/BottomControlPanel';
import { ProgressBar } from '../progress-bar/ProgressBar';

import { useBottomControlsStyles } from './useBottomControlsStyles';

interface BottomControlsProps {}

export const BottomControls: FC<BottomControlsProps> = () => {
	const { bottomControls } = useBottomControlsStyles().classes;
	return (
		<div className={bottomControls}>
			<ProgressBar />
			<BottomControlPanel />
		</div>
	);
};
