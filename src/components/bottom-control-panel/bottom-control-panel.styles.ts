import { makeStyles } from '@mui//styles';

// To be expanded for themes
export const useBottomControlPanel = makeStyles(_theme => ({
	wrapper: {
		width: '100%',
		height: '44px',
		padding: '0 4px',
		background: 'rgba(0,0,0,0.72)',
	},
	timeStampText: {
		color: 'rgba(242, 242, 242,1)',
		fontWeight: 500,
	},
	mediumIconButtons: {
		width: '36px',
		height: '100%',
		minWidth: 'unset',
		color: 'rgba(242, 242, 242,1)',
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
