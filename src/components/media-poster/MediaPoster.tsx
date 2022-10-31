import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import {
	useMediaPosterStyles,
	UseMediaPosterStylesProps,
} from './useMediaPosterStyles';

export interface MediaPosterProps extends UseMediaPosterStylesProps {
	children?: ReactNode;
	className?: string;
}
/**
 * A styled and flexible `div` container.
 * @category React Component
 */
export const MediaPoster: FC<MediaPosterProps> = ({
	children,
	className,
	...restProps
}) => {
	const { mediaPoster } = useMediaPosterStyles(restProps).classes;
	const classNames = clsx(mediaPoster, className);
	return <div className={classNames}>{children}</div>;
};
