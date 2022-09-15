import { makeStyles } from 'tss-react/mui';

export const useRailStyles = makeStyles()(theme => ({
	sliderRail: {
		backgroundColor: theme.palette.common.black,
		left: '0%',
		width: '100%',
		height: theme.spacing(0.75),
		position: 'absolute',
		top: 10,
	},
}));
