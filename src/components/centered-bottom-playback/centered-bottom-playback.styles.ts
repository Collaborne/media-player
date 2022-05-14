import makeStyles from '@mui/styles/makeStyles';

export const useCenteredBottomPlaybackStyles = makeStyles(theme => ({
	wrapper: {
		alignSelf: 'flex-end',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	playbackWrapper: {
		background: theme.palette?.paper,
		height: '40px',
		borderRadius: '8px 8px 0 0',
	},
}));
