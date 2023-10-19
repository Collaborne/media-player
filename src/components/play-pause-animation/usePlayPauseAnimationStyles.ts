import { makeStyles } from 'tss-react/mui';

export const usePlayPauseAnimationStyles = makeStyles()(theme => ({
	centeredIcon: {
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
}));
