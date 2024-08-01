import { makeStyles } from 'tss-react/mui';

export const useControlsStyles = makeStyles<{
	isCollapsed?: boolean;
} | void>()((theme, { isCollapsed = false } = {}) => ({
	controls: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		...(isCollapsed && {
			position: 'relative',
			backgroundColor: theme.palette.common.black,
		}),
	},
}));
