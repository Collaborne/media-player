import makeStyles from '@mui/styles/makeStyles';

export const useCenteredPlayButtonStyles = makeStyles({
	controlsWrapper: {
		width: '100%',
		height: '100%',
		background: 'rgba(0,0,0,0.4)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	svgStyle: {
		transition: '.2s transform ease-out',
		width: '80px',
		height: '80px',
		'&:hover': {
			transform: 'scale(1.2)',
		},
	},
});
