import { makeStyles } from '@mui/styles';

export const useCenteredBottomPlaybackStyles = makeStyles(theme => ({
	wrapper: {
		alignSelf: 'flex-end',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	playbackWrapper: {
		padding: ' 0 4px',

		backgroundColor: theme.palette.background.paper,
		height: '40px',
		borderRadius: '8px 8px 0 0',
		display: 'flex',
		alignItems: 'center',
	},
}));
