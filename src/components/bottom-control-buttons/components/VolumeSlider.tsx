import { FC } from 'react';

import { useMediaStore } from '../../../context/MediaProvider';
import { VOLUME_MULTIPLIER } from '../../../utils/constants';

import { VolumeBarStyled } from './VolumeBarStyled';

interface VolumeSliderProps {
	volumeMultiplier?: number;
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
	volumeMultiplier = VOLUME_MULTIPLIER,
}) => {
	const setVolume = useMediaStore(state => state.setVolume);
	const volume = useMediaStore(state => state.volume) * volumeMultiplier;
	const onVolumeChange = (
		event: Event,
		value: number | number[],
		_activeThumb: number,
	) => {
		event.preventDefault();
		if (Array.isArray(value)) {
			return;
		}
		setVolume?.(value / volumeMultiplier);
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
