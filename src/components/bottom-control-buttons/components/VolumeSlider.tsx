import { FC } from 'react';

import { useMediaStore } from '../../../context/MediaProvider';
import { useOnHoveredControlElement } from '../../../hooks/use-on-hovered-element';
import { VOLUME_MULTIPLIER } from '../../../utils/constants';

import { VolumeBarStyled } from './VolumeBarStyled';

interface VolumeSliderProps {
	volumeMultiplier?: number;
	className?: string;
}

/**
 * @category React Component
 * @category UI Controls
 */
export const VolumeSlider: FC<VolumeSliderProps> = ({
	volumeMultiplier = VOLUME_MULTIPLIER,
	className,
}) => {
	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();
	const [volume, setVolume] = useMediaStore(state => [
		state.volume * volumeMultiplier,
		state.setVolume,
	]);

	const onVolumeChange = (
		event: Event,
		value: number | number[],
		_activeThumb: number,
	) => {
		event.preventDefault();
		if (Array.isArray(value)) {
			return;
		}
		setVolume(value / volumeMultiplier);
	};

	return (
		<VolumeBarStyled
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			min={0}
			max={volumeMultiplier}
			value={volume}
			size="small"
			onChange={onVolumeChange}
			className={className}
		/>
	);
};
