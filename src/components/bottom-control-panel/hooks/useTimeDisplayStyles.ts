import { makeStyles } from 'tss-react/mui';

export const useTimeDisplayStyles = makeStyles()(theme => ({
	timeStampText: {
		fontWeight: 500,
		color: theme.palette.text.secondary,
	},
}));
