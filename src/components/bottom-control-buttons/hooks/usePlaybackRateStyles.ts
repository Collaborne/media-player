import { makeStyles } from 'tss-react/mui';

export const usePlaybackRateStyles = makeStyles()(theme => ({
	playBackRateBtn: {
		color: theme.palette.text.primary,
		height: theme.spacing(3),
		minWidth: theme.spacing(3),
	},
}));
