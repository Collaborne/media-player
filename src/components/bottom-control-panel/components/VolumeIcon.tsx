import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import { MIN_VOLUME } from '../../../utils/constants';
import { VolumeMutedIcon } from '../../icons/VolumeMutedIcon';

interface VolumeIconProps extends SvgIconProps {
	volume: number;
}

export const VolumeIcon: FC<VolumeIconProps> = ({ volume, ...props }) => {
	if (volume === 0) {
		return <VolumeMutedIcon {...props} />;
	}
	if (volume >= MIN_VOLUME) {
		return <VolumeUp {...props} />;
	}
	return <VolumeDown {...props} />;
};
