import { makeStyles } from 'tss-react/mui';

export const useBottomControlPanelStyles = makeStyles()(theme => ({
	wrapper: {
		width: '100%',
		height: theme.spacing(5.5),
		padding: `0 ${theme.spacing(0.5)}`,
		background: theme.palette.background.default,
		pointerEvents: 'auto',
	},
	timeStampText: {
		fontWeight: 500,
		color: theme.palette.text.secondary,
	},

	gridCentered: {
		display: 'inline-flex',
		height: '100%',
		alignItems: 'center',
	},
	playBackRateBtn: {
		color: theme.palette.text.primary,
	},
}));