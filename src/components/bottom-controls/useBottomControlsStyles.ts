import { makeStyles } from 'tss-react/mui';

export const useBottomControlsStyles = makeStyles()(theme => ({
	bottomControls: {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		bottom: 0,
		width: '100%',
		background: theme.palette.background.default,
		backdropFilter: theme.palette.backdropFilter,
	},
}));
