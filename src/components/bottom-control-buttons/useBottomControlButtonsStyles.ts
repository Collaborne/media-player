import { makeStyles } from 'tss-react/mui';

export const useBottomControlButtonsStyles = makeStyles()(theme => ({
	wrapper: {
		width: '100%',
		pointerEvents: 'auto',
		padding: theme.spacing(1),
	},
}));
