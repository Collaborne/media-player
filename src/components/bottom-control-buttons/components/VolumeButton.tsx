import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';
import { useVideoStore } from '../../../context';

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
	const volume = useVideoStore(state => state.volume) * volumeMultiplier;
	const mute = useVideoStore(state => state.mute);
	const unmute = useVideoStore(state => state.unmute);
	const isMuted = useVideoStore(state => state.muted);

	const onToggleMute = () => {
		if (isMuted) {
			unmute();
		}
		return mute();
	};

	console.log('VolumeButton RERENDER');

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
