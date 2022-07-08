import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { IconProps } from '@mui/material';
import { FC } from 'react';

import { MIN_VOLUME } from '../../../utils/constants';
import { VolumeMutedIcon } from '../../icons/VolumeMutedIcon';

interface VolumeIconProps extends IconProps {
	volume: number;
}

export const VolumeIcon: FC<VolumeIconProps> = ({ volume }) => {
	if (volume === 0) {
		return <VolumeMutedIcon />;
	}
	if (volume >= MIN_VOLUME) {
		return <VolumeUp />;
	}
	return <VolumeDown />;
};
