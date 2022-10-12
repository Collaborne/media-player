import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useMediaStore } from '../../../context';
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
	const volume = useMediaStore(state => state.volume) * volumeMultiplier;
	const mute = useMediaStore(state => state.mute);
	const unmute = useMediaStore(state => state.unmute);
	const isMuted = useMediaStore(state => state.isMuted);

	const onToggleMute = () => {
		if (isMuted) {
			unmute();
		}
		return mute();
	};

	return (
		<IconButton
			size="medium"
			onClick={onToggleMute}
			data-testid="icon-volume"
			{...props}
		>
			<Icon fontSize="medium" volume={isMuted ? 0 : volume} {...svgIconProps} />
		</IconButton>
	);
};
