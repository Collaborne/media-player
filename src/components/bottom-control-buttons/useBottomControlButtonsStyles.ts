import { makeStyles } from 'tss-react/mui';

export const useBottomControlButtonsStyles = makeStyles<{ isAudio: boolean }>()(
	(theme, { isAudio }) => ({
		wrapper: {
			width: '100%',
			height: theme.spacing(5.5),
			padding: `0 ${theme.spacing(0.5)}`,
			pointerEvents: 'auto',
			...(isAudio && {
				background: 'transparent',
			}),
		},
	}),
);
