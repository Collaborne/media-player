import { makeStyles } from 'tss-react/mui';

export const useProgressBarStyles = makeStyles<{
	isAudio: boolean;
	isPip: boolean;
}>()((theme, { isAudio, isPip }) => ({
	progressBar: {
		...(isAudio && {
			width: `calc(100% - ${theme.spacing(2)})`,
			margin: '0 auto',
			marginBottom: theme.spacing(1.25),
			...(isPip && {
				top: theme.spacing(0.5),
			}),
			...(isAudio &&
				!isPip && {
					transform: `translateY(${theme.spacing(0.5)})`,
				}),
		}),
	},
}));
