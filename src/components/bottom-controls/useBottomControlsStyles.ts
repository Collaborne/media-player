import { makeStyles } from 'tss-react/mui';

export const useBottomControlsStyles = makeStyles<{ isAudio: boolean }>()(
	(theme, { isAudio }) => {
		const bottomPadding = !isAudio ? theme.spacing(2) : 0;
		return {
			bottomControls: {
				display: 'flex',
				flexDirection: 'column',
				position: 'absolute',
				left: bottomPadding,
				right: bottomPadding,
				bottom: bottomPadding,
				borderRadius: theme.spacing(1),
				background: theme.palette.background.default,
				backdropFilter: theme.palette.backdropFilter,
			},
		};
	},
);
