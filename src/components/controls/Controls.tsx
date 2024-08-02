import { FC, ReactNode } from 'react';

import { CONTROLS } from '../../utils';

import { useControlsStyles } from './useControlsStyles';

export interface ControlProps {
	children: ReactNode;
	className?: string;
	'data-testid'?: string;
}

/**
 * Wrapper that holds all the UI Components for Controls
 * @category React Component
 * @category UI Controls
 */
export const Controls: FC<ControlProps> = ({
	children,
	className,
	'data-testid': dataTestId = CONTROLS,
}) => {
	// Controls styles
	const { classes, cx } = useControlsStyles();
	const classNameControls = cx(classes.controls, className);

	return (
		<div className={classNameControls} data-testid={dataTestId}>
			{children}
		</div>
	);
};
