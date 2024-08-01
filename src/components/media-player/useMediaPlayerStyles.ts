import { makeStyles } from 'tss-react/mui';

export const useMediaPlayerStyles = makeStyles()(theme => ({
	gridCentered: {
		display: 'inline-flex',
		height: '100%',
		alignItems: 'center',
		gap: theme.spacing(0.75),
	},
	progressBar: {
		marginBottom: theme.spacing(0.5),
	},
	collapsedContainer: {
		height: theme.spacing(12),
	},
}));
