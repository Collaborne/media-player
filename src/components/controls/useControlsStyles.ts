import { makeStyles } from '@mui/styles';

// TODO: Integrate themes and set duration as in PLAY_PAUSE_ANIMATION_DURATION
export const useControlsStyles = makeStyles(() => ({
	'@keyframes fadeOut': {
		from: {
			opacity: 0.8,
		},
		to: {
			opacity: 0,
			transform: 'translate(-50%, -50%) scale(1.2)',
		},
	},
	wrapper: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
	},
	wrapperBottomPanel: {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
	bigCenteredIcon: {
		margin: '0',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%) scale(1)',
		width: '80px',
		height: '80px',
		animation: '$fadeOut 300ms ease',
		animationIterationCount: 1,
	},
}));
