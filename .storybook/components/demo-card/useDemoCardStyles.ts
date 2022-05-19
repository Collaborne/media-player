import { makeStyles } from '@mui/styles';

export const useDemoCardStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		overflow: 'hidden',
		height: '100%',
		boxSizing: 'border-box',
		border: `${theme.spacing(0.125)} solid ${theme.palette.error}`,
		flexShrink: 0,
	},
	header: {
		flexShrink: 0,
		padding: theme.spacing(1.25),
		boxShadow: `0 -${theme.spacing(
			0.125,
		)} 0 var(--modal-window-header-shadow-color) inset`,
		boxSizing: 'border-box',
	},
	title: {
		fontWeight: 300,
	},
	body: {
		padding: theme.spacing(2.5),
		flexGrow: 1,
		boxSizing: 'border-box',
		position: 'relative',
		width: '100%',
		overflow: 'hidden',
	},
}));
