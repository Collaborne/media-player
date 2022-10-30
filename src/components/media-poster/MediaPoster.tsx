import { styled } from '@mui/material/styles';
import { CSSProperties } from '@mui/styled-engine';

interface MediaPosterProps extends CSSProperties {
	img?: string;
}

export const MediaPoster = styled('div')<MediaPosterProps>(
	({ theme }) =>
		({ img, ...props }) => ({
			background: 'black',
			backgroundImage: img ? `url('${img}')` : 'none',
			width: props.width ?? theme.spacing(40),
			height: props.height ?? theme.spacing(40),
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			...props,
		}),
);
