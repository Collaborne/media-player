import { makeStyles } from 'tss-react/mui';

export const usePlayPauseAnimationStyles = makeStyles()(theme => ({
	centeredIcon: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
}));
