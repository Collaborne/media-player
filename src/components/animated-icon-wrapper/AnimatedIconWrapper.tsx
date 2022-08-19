import { FC, PropsWithChildren } from 'react';
import Transition from 'react-transition-group/Transition';

import {
	defaultStyle,
	transitionStyles,
	useAnimatedIconWrapperStyles,
} from './useAnimatedIconWrapperStyles';

interface AnimatedIconWrapperProps extends PropsWithChildren {
	durationMs: number;
	hasAnimationStarted?: boolean;
}
export const AnimatedIconWrapper: FC<AnimatedIconWrapperProps> = ({
	durationMs,
	children,
	hasAnimationStarted,
}) => {
	const { root } = useAnimatedIconWrapperStyles().classes;

	return (
		<Transition in={hasAnimationStarted} timeout={durationMs}>
			{state => {
				console.log(state);
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
