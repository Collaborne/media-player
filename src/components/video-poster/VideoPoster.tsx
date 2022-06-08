import { styled } from '@mui/material/styles';

interface VideoPosterProps {
	img?: string;
	width?: number;
	height?: number;
}

export const VideoPoster = styled('div')<VideoPosterProps>(
	({ theme }) =>
		({ img, width, height }) => ({
			backgroundImage: img ?? 'none',
			width: width ?? theme.spacing(40),
			height: height ?? theme.spacing(40),
			background: 'black',
		}),
);
