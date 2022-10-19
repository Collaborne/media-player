import { styled } from '@mui/material/styles';

interface MediaPosterProps {
	img?: string;
	width?: number | string;
	height?: number | string;
}

export const MediaPoster = styled('div')<MediaPosterProps>(
	({ theme }) =>
		({ img, width, height }) => ({
			background: 'black',
			backgroundImage: img ? `url('${img}')` : 'none',
			width: width ?? theme.spacing(40),
			height: height ?? theme.spacing(40),
			backgroundSize: 'contain',
		}),
);
