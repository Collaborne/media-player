import { makeStyles } from '@mui/styles';

export const usePipOverlayStyles = makeStyles(theme => ({
	wrapper: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		display: 'flex',
		background: 'rgba(0,0,0,0.4)',
	},
	iconButton: {
		background: theme.palette.background.paper,
		borderRadius: theme.spacing(0.5),
	},
	iconLeftWrapper: {
		marginLeft: theme.spacing(1),
		marginTop: theme.spacing(1),
	},
	iconRightWrapper: {
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(1),
	},
	iconMiddle: {
		color: theme.palette.contrasts[4],
	},
	centerIcon: {
		width: theme.spacing(6),
	},
	centerButtonIcon: {
		margin: theme.spacing(0, 2),
	},
	playBackRateWrapper: {
		marginTop: theme.spacing(1),
		background: theme.palette.background.paper,
		width: theme.spacing(3),
		height: theme.spacing(3),
		minWidth: 'unset',
	},
	playbackTypography: {
		// Styling the "x" symbol
		'& span': {
			fontSize: theme.spacing(1),
			fontWeight: 800,
			lineHeight: 1,
		},
	},
}));
