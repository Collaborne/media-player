import { makeStyles } from 'tss-react/mui';

export const useMediaContainerStyles = makeStyles<{ isAudio: boolean }>()(
	(theme, { isAudio }) => ({
		wrapper: {
			position: 'relative',
			alignItems: 'center',
			display: 'flex',
			justifyContent: 'center',
			backgroundSize: 'cover',
			overflow: 'hidden',
			height: isAudio ? theme.spacing(8.25) : 'unset',
			borderRadius: isAudio ? theme.spacing(0.5, 0.5, 0, 0) : 'unset',
		},
		pipText: {
			margin: theme.spacing(1, 0, 0, 2),
		},
		reactPlayer: {
			cursor: 'pointer',
			position: 'relative',
			// We do not display ReactPlayer in audio mode
			display: isAudio ? 'none' : 'flex',
			alignItems: 'center',
		},
	}),
);

export const useFilePlayerStyles = makeStyles<{ isAudio: boolean }>()(
	(_, { isAudio }) => ({
		wrapper: {
			aspectRatio: isAudio ? 'unset' : '16 / 9',
			width: '100%',
		},
	}),
);
