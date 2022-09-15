import { FC, ReactNode } from 'react';

import { useControlsStyles } from './useControlsStyles';

export interface ControlProps {
	children: ReactNode;
}

export const Controls: FC<ControlProps> = ({ children }) => {
	// Controls styles
	const { controls } = useControlsStyles().classes;

	return <div className={controls}>{children}</div>;
};
