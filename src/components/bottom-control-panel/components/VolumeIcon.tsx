import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { IconProps } from '@mui/material';
import { FC } from 'react';

import { MIN_VOLUME } from '../../../utils/constants';
import { VolumeMuted } from '../../icons/VolumeMuted';
import { useBottomControlPanelStyles } from '../useBottomControlPanelStyles';

interface VolumeIconProps extends IconProps {
	volume: number;
}

export const VolumeIcon: FC<VolumeIconProps> = ({ volume }) => {
	const { mediumIcons } = useBottomControlPanelStyles().classes;

	if (volume === 0) {
		return <VolumeMuted className={mediumIcons} />;
	}
	if (volume >= MIN_VOLUME) {
		return <VolumeUp className={mediumIcons} />;
	}
	return <VolumeDown className={mediumIcons} />;
};
