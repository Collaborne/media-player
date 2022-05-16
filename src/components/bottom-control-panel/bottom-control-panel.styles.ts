import { makeStyles } from '@mui//styles';

export const useBottomControlPanel = makeStyles(theme => ({
	wrapper: {
		width: '100%',
		height: '44px',
		padding: '0 4px',
		background: 'rgba(0,0,0,0.72)',
	},
	timeStampText: {
		color: theme.palette.primary.contrastText,
	},
	mediumIconButtons: {
		width: '36px',
		height: '100%',
		minWidth: 'unset',
		color: theme.palette.primary.contrastText,
	},
	gridCentered: {
		display: 'inline-flex',
		height: '100%',
		alignItems: 'center',
	},
	mediumIcons: {
		fill: 'currentColor',
		width: '28px',
		height: 'auto',
	},
	pipIcon: {
		width: '24px',
		height: 'auto',
	},
	fullScreenIcon: {
		width: '30px',
		height: 'auto',
	},
}));
