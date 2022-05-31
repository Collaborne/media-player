import { makeStyles } from '@mui/styles';

// TODO: Integrate themes and set duration as in PLAY_PAUSE_ANIMATION_DURATION
interface UseControlStyles {
	isEnteringPauseAnimation?: boolean;
	isEnteringPlayAnimation?: boolean;
	durationMs: number;
}

export const useControlsStyles = makeStyles(theme => ({
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
	pauseIconWrapper: ({
		isEnteringPauseAnimation,
		durationMs,
	}: UseControlStyles) => ({
		margin: '0',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: isEnteringPauseAnimation
			? 'translate(-50%, -50%) scale(1.2)'
			: 'translate(-50%, -50%) scale(1)',
		opacity: isEnteringPauseAnimation ? 0.8 : 0,
		transition: `${durationMs}ms all ease-out`,
	}),
	playIconWrapper: ({
		isEnteringPlayAnimation,
		durationMs,
	}: UseControlStyles) => ({
		margin: '0',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: isEnteringPlayAnimation
			? 'translate(-50%, -50%) scale(1.2)'
			: 'translate(-50%, -50%) scale(1)',
		opacity: isEnteringPlayAnimation ? 0.8 : 0,
		transition: `${durationMs}ms all ease-in`,
	}),

	bigCenteredIcon: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
}));
