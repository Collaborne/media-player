import { makeStyles } from 'tss-react/mui';

export const usePlaybackRateStyles = makeStyles()(theme => ({
	playBackRateBtn: {
		color: theme.palette.text.primary,
		height: theme.spacing(4.5),
		minWidth: theme.spacing(4.5),
	},
}));
