import { FC, useCallback } from 'react';

import clsx from 'clsx';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { useCenteredPlayButtonStyles } from './useCenteredPlayButtonStyles';
import { BigPlayIcon } from '../icons/BigPlayIcon';
import { useVideo } from '../../hooks/use-video';

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
	const { api } = useVideo();
	const onPlay = useCallback(() => {
		api?.play?.();
		onClick?.();
	}, [api, onClick]);

	return (
		<div className={clsx(controlsWrapper, classNames)} onClick={onPlay}>
			<IconButton {...iconButtonProps}>
				<BigPlayIcon className={svgStyle} />
			</IconButton>
		</div>
	);
};
