import { FC, PropsWithChildren, useRef } from 'react';
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

	const nodeRef = useRef<HTMLDivElement>(null);

	return (
		<Transition
			in={startAnimation}
			timeout={durationMs}
			nodeRef={nodeRef}
			data-testid="asdasd"
		>
			{state => {
				return (
					<div
						ref={nodeRef}
						className={cx(root, className)}
						style={{
							...defaultStyle(durationMs),
							...transitionStyles[state as keyof typeof transitionStyles],
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
