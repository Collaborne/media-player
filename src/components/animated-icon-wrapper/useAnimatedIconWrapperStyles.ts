import { CSSProperties } from 'react';
import { makeStyles } from 'tss-react/mui';

export const useAnimatedIconWrapperStyles = makeStyles()({
	root: {
		margin: '0',
		position: 'absolute',
		top: '50%',
		left: '50%',
	},
});

/** Styles used for TransitionStatus transformations */
export const transitionStyles = {
	entering: {
		opacity: 0.7,
		display: 'block',
		transform: 'translate(-50%, -50%) scale(1)',
	},
	exiting: {
		opacity: 0,
		display: 'block',
		transform: 'translate(-50%, -50%) scale(1.2)',
	},
	exited: {
		opacity: 0,
		transform: 'translate(-50%, -50%) scale(1)',
		display: 'none',
	},
};

/** Default inline CSS */
export const defaultStyle = (duration: number): CSSProperties => ({
	transition: `all ${duration}ms ease-out`,
	transform: 'translate(-50%, -50%) scale(1)',
	opacity: 0,
});
