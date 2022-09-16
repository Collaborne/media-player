import { FC, ReactNode } from 'react';

import { useBottomControlsStyles } from './useBottomControlsStyles';

interface BottomControlsProps {
	children: ReactNode;
}

export const BottomControls: FC<BottomControlsProps> = ({ children }) => {
	const { bottomControls } = useBottomControlsStyles().classes;
	return <div className={bottomControls}>{children}</div>;
};
