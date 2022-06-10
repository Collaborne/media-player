import { makeStyles } from '@mui/styles';

export const useVideoContainerStyles = makeStyles(theme => ({
	wrapper: {
		position: 'relative',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		backgroundSize: 'cover',
		'& .react-player': {
			display: 'flex',
			alignItems: 'center',
		},
	},
	pipText: {
		color: theme.palette.contrasts[4],
		margin: theme.spacing(1, 0, 0, 2),
	},
}));
