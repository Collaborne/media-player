import { makeStyles } from '@mui/styles';

export const useControlsStyles = makeStyles(() => ({
	wrapper: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
	},
	wrapperBottomPanel: {
		display: 'flex',
	},
}));
