import { makeStyles } from 'tss-react/mui';

const BUTTON_SIZE = 8;

export const useBigCenteredButtonStyles = makeStyles()(theme => ({
	controlsWrapper: {
		width: '100%',
		height: '100%',
		background: 'rgba(0,0,0,0.4)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		pointerEvents: 'auto',
	},

	button: {
		width: theme.spacing(BUTTON_SIZE),
		height: theme.spacing(BUTTON_SIZE),
		borderRadius: '50%',
	},

	svgStyle: {
		transition: '.2s transform ease-out',
		width: theme.spacing(BUTTON_SIZE),
		height: theme.spacing(BUTTON_SIZE),
		'&:hover': {
			transform: 'scale(1.2)',
		},
	},
}));
