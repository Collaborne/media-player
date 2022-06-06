import { styled } from '@mui/material/styles';

interface VideoPosterProps {
	img?: string;
	width?: number;
	height?: number;
}

export const VideoPoster = styled('div')<VideoPosterProps>(
	({ img, width, height }) => ({
		backgroundImage: img ?? 'none',
		width: width ?? '100px',
		height: height ?? '100px',
	}),
);
