import { CSSProperties } from '@emotion/serialize';
import { makeStyles } from 'tss-react/mui';

export interface UseMediaPosterStylesProps extends CSSProperties {
	img?: string;
}

export const useMediaPosterStyles = makeStyles<UseMediaPosterStylesProps>()(
	(theme, { img, ...props }) => ({
		mediaPoster: {
			background: theme.palette.common.black,
			backgroundImage: img ? `url('${img}')` : 'none',
			width: props.width ?? theme.spacing(40),
			height: props.height ?? theme.spacing(40),
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			...props,
		},
	}),
);
