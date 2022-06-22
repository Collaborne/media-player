import { makeStyles } from 'tss-react/mui';

export const useCenteredBottomPlaybackStyles = makeStyles()(theme => ({
	wrapper: {
		position: 'absolute',
		bottom: 0,
		alignSelf: 'flex-end',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		pointerEvents: 'auto',
	},
	playbackWrapper: {
		padding: theme.spacing(0.5),
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
