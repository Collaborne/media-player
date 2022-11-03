import { makeStyles } from 'tss-react/mui';

export const useProgressBarStyles = makeStyles<{
	isAudio: boolean;
	isPip: boolean;
}>()((theme, { isAudio, isPip }) => ({
	progressBar: {
		...(!isAudio && {
			position: 'absolute',
			top: theme.spacing(-2),
			height: theme.spacing(0.75),
			zIndex: '2',
		}),
		...(isAudio && {
			width: `calc(100% - ${theme.spacing(2)})`,
			margin: '0 auto',
			marginBottom: theme.spacing(1.25),
			'& .MuiSlider-thumb': {
				marginTop: theme.spacing(0.675),
			},
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
