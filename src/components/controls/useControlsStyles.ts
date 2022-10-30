import { makeStyles } from 'tss-react/mui';

export const useControlsStyles = makeStyles<{ isAudio: boolean }>()(
	(theme, { isAudio }) => ({
		controls: {
			width: '100%',
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			...(isAudio && {
				background: theme.palette.background.default,
			}),
		},
	}),
);
