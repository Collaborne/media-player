import { makeStyles } from 'tss-react/mui';

export const useBottomControlsStyles = makeStyles()(theme => ({
	bottomControls: {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		left: theme.spacing(2),
		right: theme.spacing(2),
		bottom: theme.spacing(2),
		borderRadius: theme.spacing(1),
		background: theme.palette.background.default,
		backdropFilter: theme.palette.backdropFilter,
	},
}));
