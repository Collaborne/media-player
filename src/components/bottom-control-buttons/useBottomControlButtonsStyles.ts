import { makeStyles } from 'tss-react/mui';

export const useBottomControlButtonsStyles = makeStyles()(theme => ({
	wrapper: {
		width: '100%',
		height: theme.spacing(5.5),
		padding: `0 ${theme.spacing(0.5)}`,
		background: theme.palette.background.default,
		pointerEvents: 'auto',
	},
}));