import { makeStyles } from 'tss-react/mui';

export const usePipOverlayStyles = makeStyles()(theme => ({
	wrapper: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		display: 'flex',
		background: 'rgba(0,0,0,0.4)',
	},
	iconButton: {
		borderRadius: theme.spacing(0.5),
		pointerEvents: 'auto',
	},
	iconRightWrapper: {
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(1),
		position: 'absolute',
		top: 0,
		right: 0,
		pointerEvents: 'none',
	},

	centerIcon: {
		width: theme.spacing(6),
	},
	centerButtonIcon: {
		margin: theme.spacing(0, 1.5),
	},
	playBackRateWrapper: {
		marginTop: theme.spacing(1),

		minWidth: 'unset',
		pointerEvents: 'auto',
	},
}));
