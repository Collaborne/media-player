import { FC, ReactNode } from 'react';

import { useIsAudio } from '../../hooks';

import { useBottomControlsStyles } from './useBottomControlsStyles';

interface BottomControlsProps {
	children: ReactNode;
	className?: string;
}
/**
 * Wrapper that includes bottom controls
 * @category React Component
 * @category UI Controls
 */
export const BottomControls: FC<BottomControlsProps> = ({
	children,
	className,
}) => {
	const isAudio = useIsAudio();
	const {
		classes: { bottomControls },
		cx,
	} = useBottomControlsStyles({ isAudio });
	return <div className={cx(bottomControls, className)}>{children}</div>;
};
