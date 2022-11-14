import { SliderProps } from '@mui/material/Slider/Slider';
import { FC, useState } from 'react';

import { useMediaListener } from '../../hooks';
import { EmitterListeners } from '../../types/emitters';
import { PROGRESS_BAR_DIVIDER } from '../../utils/constants';

interface EventProgressBarProps extends SliderProps {
	className?: string;
	mediaListener?: EmitterListeners;
}

/** A MUI Slider configured for displaying currentTime/duration values from `MediaStore`
 * uses `EmitterListeners` for displaying data
 * @category React Component
 * @category UI Controls
 */
export const EventProgressBar: FC<EventProgressBarProps> = ({
	mediaListener,
}) => {
	const [value, setValue] = useState(0);

	useMediaListener(
		'timeupdate',
		({ duration, seconds }) => {
			if (duration && seconds) {
				return setValue((seconds / duration) * PROGRESS_BAR_DIVIDER);
			}
			return setValue(0);
		},
		mediaListener,
	);
	console.log(value);
	return null;
};
