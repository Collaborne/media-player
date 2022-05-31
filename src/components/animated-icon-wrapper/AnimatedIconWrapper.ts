import { styled } from '@mui/material/styles';

interface AnimatedIconWrapperProps {
	durationMs: number;
}

export const AnimatedIconWrapper = styled('div')<AnimatedIconWrapperProps>(
	({ durationMs }) => ({
		'@keyframes fadeOut': {
			from: {
				opacity: 0.7,
			},
			to: {
				transform: 'translate(-50%, -50%) scale(1.2)',
				opacity: 0,
			},
		},
		margin: '0',
		transform: 'translate(-50%, -50%)',
		position: 'absolute',
		top: '50%',
		left: '50%',
		animationName: 'fadeOut',
		animationDuration: `${durationMs}ms`,
		animationTimingFunction: 'ease-out',
	}),
);
