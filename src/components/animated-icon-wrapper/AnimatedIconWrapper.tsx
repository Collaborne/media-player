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
}
/**
 * Component used as a wrapper for transitions
 * @category React Component
 */
export const AnimatedIconWrapper: FC<AnimatedIconWrapperProps> = ({
	durationMs,
	children,
	startAnimation,
}) => {
	const { root } = useAnimatedIconWrapperStyles().classes;

	return (
		<Transition in={startAnimation} timeout={durationMs}>
			{state => {
				return (
					<div
						className={root}
						style={{
							...defaultStyle(durationMs),
							...transitionStyles[state],
						}}
					>
						{children}
					</div>
				);
			}}
		</Transition>
	);
};
