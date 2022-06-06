import { makeStyles } from '@mui/styles';

export const useVideoContainerStyles = makeStyles({
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
});
