import { makeStyles } from 'tss-react/mui';

export const useControlsStyles = makeStyles()(() => ({
	wrapper: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
	},
}));
