import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useMediaStore } from '../../../context';
import { useOnHoveredControlElement } from '../../../hooks/use-on-hovered-element';
import { VOLUME_MULTIPLIER } from '../../../utils/constants';

import { VolumeIcon } from './VolumeIcon';

interface VolumeButtonProps extends IconButtonProps {
	Icon?: ComponentType<SvgIconProps>;
	svgIconProps?: SvgIconProps;
	volumeMultiplier?: number;
}

/**
 * @category React Component
 * @category UI Controls
 */
export const VolumeButton: FC<VolumeButtonProps> = ({
	Icon = VolumeIcon,
	svgIconProps,
	volumeMultiplier = VOLUME_MULTIPLIER,
	...props
}) => {
	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();
	const [volume, mute, unmute, isMuted] = useMediaStore(state => [
		state.volume * volumeMultiplier,
		state.mute,
		state.unmute,
		state.isMuted,
	]);

	const onToggleMute = () => {
		if (isMuted) {
			return unmute();
		}
		mute();
	};

	return (
		<IconButton
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			size="medium"
			onClick={onToggleMute}
			data-testid="icon-volume"
			{...props}
		>
			<Icon fontSize="medium" volume={isMuted ? 0 : volume} {...svgIconProps} />
		</IconButton>
	);
};
