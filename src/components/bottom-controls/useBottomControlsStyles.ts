import { makeStyles } from 'tss-react/mui';

export const useBottomControlsStyles = makeStyles()(() => ({
	bottomControls: {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
}));
