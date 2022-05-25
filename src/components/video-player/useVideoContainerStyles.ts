import { makeStyles } from '@mui/styles';

export const useVideoContainerStyles = makeStyles({
	wrapper: {
		position: 'relative',
		alignItems: 'center',
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
		backgroundSize: 'cover',
		'& .react-player': {
			display: 'flex',
			alignItems: 'center',
			overflow: 'hidden',
		},
	},
});
