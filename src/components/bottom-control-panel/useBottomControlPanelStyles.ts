import { makeStyles } from '@mui/styles';

export const useBottomControlPanelStyles = makeStyles(theme => ({
	wrapper: {
		width: '100%',
		height: theme.spacing(5.5),
		padding: `0 ${theme.spacing(0.5)}`,
		background: theme.palette.background.paper,
	},
	timeStampText: {
		fontWeight: 500,
		color: theme.palette.text.secondary,
	},
	mediumIconButtons: {
		width: theme.spacing(4.5),
		height: '100%',
		minWidth: 'unset',
	},
	gridCentered: {
		display: 'inline-flex',
		height: '100%',
		alignItems: 'center',
	},
	mediumIcons: {
		width: theme.spacing(3.5),
		height: 'auto',
	},
	pipIcon: {
		width: theme.spacing(3),
		height: 'auto',
	},
	fullScreenIcon: {
		width: theme.spacing(3.75),
		height: 'auto',
	},
}));
