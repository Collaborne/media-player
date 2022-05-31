import { makeStyles } from '@mui/styles';

export const useBigCenteredButtonStyles = makeStyles(theme => ({
	controlsWrapper: {
		width: '100%',
		height: '100%',
		background: 'rgba(0,0,0,0.4)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		pointerEvents: 'auto',
	},

	svgStyle: {
		transition: '.2s transform ease-out',
		width: theme.spacing(10),
		height: theme.spacing(10),
		'&:hover': {
			transform: 'scale(1.2)',
		},
	},
}));
