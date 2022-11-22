import { FC, PropsWithChildren } from 'react';
import Transition from 'react-transition-group/Transition';

import {
	defaultStyle,
	transitionStyles,
	useAnimatedIconWrapperStyles,
} from './useAnimatedIconWrapperStyles';

interface AnimatedIconWrapperProps extends PropsWithChildren {
	durationMs: number;
	startAnimation?: boolean;
	className?: string;
	'data-testid'?: string;
}
/**
 * Component used as a wrapper for transitions
 * @category React Component
 */
export const AnimatedIconWrapper: FC<AnimatedIconWrapperProps> = ({
	durationMs,
	children,
	startAnimation,
	className,
	'data-testid': dataTestId,
}) => {
	const {
		classes: { root },
		cx,
	} = useAnimatedIconWrapperStyles();

	return (
		<Transition in={startAnimation} timeout={durationMs} data-testid="asdasd">
			{state => {
				return (
					<div
						className={cx(root, className)}
						style={{
							...defaultStyle(durationMs),
							...transitionStyles[state],
						}}
						data-testid={dataTestId}
					>
						{children}
					</div>
				);
			}}
		</Transition>
	);
};
