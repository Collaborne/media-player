import { FC } from 'react';

import { IconProps } from '@mui/material';
import { VolumeUp, VolumeDown } from '@mui/icons-material';

import { useBottomControlPanelStyles } from '../useBottomControlPanelStyles';
import { VolumeMuted } from '../../icons/VolumeMuted';
import { MIN_VOLUME } from '../../../utils/constants';

interface VolumeIconProps extends IconProps {
	volume: number;
}

export const VolumeIcon: FC<VolumeIconProps> = ({ volume }) => {
	const { mediumIcons } = useBottomControlPanelStyles();

	if (volume === 0) {
		return <VolumeMuted className={mediumIcons} />;
	}
	if (volume >= MIN_VOLUME) {
		return <VolumeUp className={mediumIcons} />;
	}
	return <VolumeDown className={mediumIcons} />;
};
