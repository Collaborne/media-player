import makeStyles from '@mui/styles/makeStyles';

export const useDemoCardStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		overflow: 'hidden',
		height: '100%',
		boxSizing: 'border-box',
		border: '1px solid red',
		flexShrink: 0,
		bordSer: '1px solid green',
	},
	header: {
		flexShrink: 0,
		padding: '10px',
		boxShadow: ' 0 -1px 0 var(--modal-window-header-shadow-color) inset',
		boxSizing: 'border-box',
	},
	title: {
		fontWeight: 300,
	},
	body: {
		padding: '20px',
		flexGrow: 1,
		boxSizing: 'border-box',
		position: 'relative',
		width: '100%',
		overflow: 'hidden',
	},
});
