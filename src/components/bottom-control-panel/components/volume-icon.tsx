import { FC } from 'react';

import { IconProps, SvgIcon } from '@mui/material';
import { VolumeUp, VolumeDown } from '@mui/icons-material';

import { useBottomControlPanel } from '../bottom-control-panel.styles';

interface VolumeIconProps extends IconProps {
	volume: number;
}

export const VolumeIcon: FC<VolumeIconProps> = ({ volume }) => {
	const { mediumIcons } = useBottomControlPanel();

	if (volume === 0) {
		return (
			<SvgIcon viewBox="0 0 28 28" className={mediumIcons}>
				<path
					d="M4 10.5V17.5H8.66667L14.5 23.3334V4.66669L8.66667 10.5H4Z"
					fill="#F2F2F2"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M16 17.5425L23.5425 10L25.0511 11.5085L17.5085 19.051L16 17.5425Z"
					fill="#F2F2F2"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M23.5433 19.0509L16.0007 11.5085L17.5093 10L25.0518 17.5425L23.5433 19.0509Z"
					fill="#F2F2F2"
				/>
			</SvgIcon>
		);
	}
	if (volume >= 50) {
		return <VolumeUp className={mediumIcons} />;
	}
	return <VolumeDown className={mediumIcons} />;
};
