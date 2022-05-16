import { makeStyles } from '@mui/styles';

export const useProgressBarStyles = makeStyles({
	wrapper: {
		alignSelf: 'flex-end',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	progressBarWrapper: {
		width: '100%',
		display: 'flex',
		alignItems: 'flex-end',
	},
});
