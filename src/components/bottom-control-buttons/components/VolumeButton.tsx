import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useVideo } from '../../../hooks';
import { VOLUME_MULTIPLIER } from '../../../utils/constants';

import { VolumeIcon } from './VolumeIcon';

interface VolumeButtonProps extends IconButtonProps {
	Icon?: ComponentType<SvgIconProps>;
	svgIconProps?: SvgIconProps;
	volumeMultiplier?: number;
}

export const VolumeButton: FC<VolumeButtonProps> = ({
	Icon = VolumeIcon,
	svgIconProps,
	volumeMultiplier = VOLUME_MULTIPLIER,
	...props
}) => {
	const { api } = useVideo();
	const volume = (Number(api?.getVolume?.()) || 0) * volumeMultiplier;
	const onToggleMute = () => {
		if (api?.getMuted?.()) {
			return api?.unmute?.();
		}
		return api?.mute?.();
	};

	return (
		<IconButton
			size="medium"
			onClick={onToggleMute}
			data-testid="icon-volume"
			{...props}
		>
			<Icon
				fontSize="medium"
				volume={api?.getMuted?.() ? 0 : volume}
				{...svgIconProps}
			/>
		</IconButton>
	);
};
