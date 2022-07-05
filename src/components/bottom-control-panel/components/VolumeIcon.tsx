import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { IconProps } from '@mui/material';
import { FC } from 'react';

import { MIN_VOLUME } from '../../../utils/constants';
import { VolumeMuted } from '../../icons/VolumeMuted';

interface VolumeIconProps extends IconProps {
	volume: number;
}

export const VolumeIcon: FC<VolumeIconProps> = ({ volume }) => {
	if (volume === 0) {
		return <VolumeMuted />;
	}
	if (volume >= MIN_VOLUME) {
		return <VolumeUp />;
	}
	return <VolumeDown />;
};
