import { FC, ReactNode } from 'react';

import { useMediaStore } from '../../context';

import { useControlsStyles } from './useControlsStyles';

export interface ControlProps {
	children: ReactNode;
}

export const Controls: FC<ControlProps> = ({ children }) => {
	const showControls = useMediaStore(state => state.showControls);
	// Controls styles
	const { controls } = useControlsStyles().classes;
	if (!showControls) {
		return null;
	}
	return <div className={controls}>{children}</div>;
};
