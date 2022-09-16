import { FC } from 'react';

import { useVideo } from '../../../hooks';
import { VOLUME_MULTIPLIER } from '../../../utils/constants';

import { VolumeBarStyled } from './VolumeBarStyled';

interface VolumeSliderProps {
	volumeMultiplier?: number;
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
	volumeMultiplier = VOLUME_MULTIPLIER,
}) => {
	const { api } = useVideo();
	const volume = (Number(api?.getVolume?.()) || 0) * volumeMultiplier;
	const onVolumeChange = (
		event: Event,
		value: number | number[],
		_activeThumb: number,
	) => {
		event.preventDefault();
		if (Array.isArray(value)) {
			return;
		}
		api?.setVolume?.(value / volumeMultiplier);
	};

	return (
		<VolumeBarStyled
			min={0}
			max={volumeMultiplier}
			value={volume}
			size="small"
			onChange={onVolumeChange}
		/>
	);
};
