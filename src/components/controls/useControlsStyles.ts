import { makeStyles } from 'tss-react/mui';

export const useControlsStyles = makeStyles<{ isAudio: boolean }>()(
	(theme, { isAudio }) => ({
		controls: {
			width: '100%',
			height: isAudio ? theme.spacing(8.25) : '100%',
			position: 'absolute',
			pointerEvents: 'none',
			background: theme.palette.background.default,
			...(isAudio && {}),
		},
	}),
);
