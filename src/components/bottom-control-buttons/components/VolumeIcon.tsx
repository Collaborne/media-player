import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { ComponentType, FC } from 'react';

import { MIN_VOLUME } from '../../../utils/constants';
import { VolumeMutedIcon } from '../../icons/VolumeMutedIcon';

type VolumeIcons = {
	VolumeMuted: ComponentType<SvgIconProps>;
	VolumeUp: ComponentType<SvgIconProps>;
	VolumeDown: ComponentType<SvgIconProps>;
};
export interface VolumeIconProps extends SvgIconProps {
	volume: number;
	Icons?: VolumeIcons;
	minVolume?: number;
}

/**
 * @category React Component
 * @category UI Controls
 */
export const VolumeIcon: FC<VolumeIconProps> = ({
	volume,
	Icons = { VolumeUp, VolumeDown, VolumeMuted: VolumeMutedIcon },
	minVolume = MIN_VOLUME,
	...props
}) => {
	if (volume === 0) {
		return <Icons.VolumeMuted {...props} />;
	}
	if (volume >= minVolume) {
		return <Icons.VolumeUp {...props} />;
	}
	return <Icons.VolumeDown {...props} />;
};
