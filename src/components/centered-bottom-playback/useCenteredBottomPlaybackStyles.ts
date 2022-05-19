import { makeStyles } from '@mui/styles';

export const useCenteredBottomPlaybackStyles = makeStyles(theme => ({
	wrapper: {
		alignSelf: 'flex-end',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	playbackWrapper: {
		padding: `0 ${theme.spacing(0.5)}`,
		background: theme.palette.background.paper,

		height: theme.spacing(5),
		borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
		display: 'flex',
		alignItems: 'center',
	},
	playbackRateInner: {
		fontWeight: 600,
	},
}));
