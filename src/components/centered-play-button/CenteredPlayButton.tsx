import { FC } from 'react';

import clsx from 'clsx';
import IconButton, {
	IconButtonProps,
} from '@mui/material/IconButton/IconButton';

import { useCenteredPlayButtonStyles } from './useCenteredPlayButtonStyles';
import { PlayButtonBig } from '../icons/PlayButtonBig';

interface CenteredPlayButtonProps {
	onClick?: VoidFunction;
	classNames?: string;
	iconButtonProps?: IconButtonProps;
}

export const CenteredPlayButton: FC<CenteredPlayButtonProps> = ({
	onClick,
	classNames,
	iconButtonProps,
}) => {
	const { controlsWrapper, svgStyle } = useCenteredPlayButtonStyles();

	return (
		<div className={clsx(controlsWrapper, classNames)}>
			<IconButton onClick={onClick} {...iconButtonProps}>
				<PlayButtonBig className={svgStyle} />
			</IconButton>
		</div>
	);
};
