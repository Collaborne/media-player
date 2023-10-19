import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useRailStyles = makeStyles()(theme => ({
	sliderRail: {
		backgroundColor: alpha(theme.palette.common.white, 0.2),
		left: '0%',
		width: '100%',
		height: theme.spacing(0.5),
		position: 'absolute',
		top: 1,
		borderRadius: theme.spacing(0.25),
	},
}));
