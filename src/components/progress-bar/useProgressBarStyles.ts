import { makeStyles } from 'tss-react/mui';

export const useProgressBarStyles = makeStyles<{
	isAudio: boolean;
	isPip: boolean;
}>()((theme, { isAudio, isPip }) => ({
	progressBar: {
		...(!isAudio && {
			height: theme.spacing(0.5),
			zIndex: '2',
		}),
		...(isAudio && {
			width: '100%',
			margin: '0 auto',
			marginBottom: theme.spacing(1.25),
			...(isPip && {
				top: theme.spacing(0.5),
			}),
		}),
	},
}));
