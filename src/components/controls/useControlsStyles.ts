import { makeStyles } from 'tss-react/mui';

export const useControlsStyles = makeStyles()(theme => ({
	wrapper: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
	},
	wrapperBottomPanel: {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
	bigCenteredIcon: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
}));
