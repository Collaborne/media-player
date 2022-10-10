import { styled } from '@mui/material/styles';

interface MediaPosterProps {
	img?: string;
	width?: number;
	height?: number;
}

export const MediaPoster = styled('div')<MediaPosterProps>(
	({ theme }) =>
		({ img, width, height }) => ({
			backgroundImage: img ?? 'none',
			width: width ?? theme.spacing(40),
			height: height ?? theme.spacing(40),
			background: 'black',
		}),
);
