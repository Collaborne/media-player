import { FC, ReactNode } from 'react';

import { useMediaStore } from '../../context';

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
	const showControls = useMediaStore(state => state.showControls);

	// Controls styles
	const { classes, cx } = useControlsStyles();
	const classNameControls = cx(classes.controls, className);

	// Only <ProgressBar/> should be present if Controls components are not shown
	if (!showControls) {
		return null;
	}

	return <div className={classNameControls}>{children}</div>;
};
