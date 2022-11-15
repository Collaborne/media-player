import { SliderProps } from '@mui/material/Slider/Slider';
import { FC, useState } from 'react';

import { EventRailsProvider } from '../../context/EventRailsProvider';
import { useMediaListener } from '../../hooks';
import { Highlight } from '../../types';
import { EmitterListeners } from '../../types/emitters';
import { blend, BlendColors, toTwoDigits } from '../../utils';
import { PROGRESS_BAR_DIVIDER } from '../../utils/constants';

import { EventRail } from './components/EventRail';
import { ProgressBarStyled } from './components/ProgressBarStyled';

interface EventBasedProgressBarProps extends SliderProps {
	mediaListener?: EmitterListeners;
	setCurrentTime?: (relativeSeconds: number) => void;
	highlights?: Highlight[];
	getHighlightColorBlended?: BlendColors;
}

/**
 * A MUI Slider configured for displaying currentTime/duration values from `MediaStore`
 * uses `EmitterListeners` for displaying data
 * @category React Component
 * @category UI Controls
 */
export const EventBasedProgressBar: FC<EventBasedProgressBarProps> = ({
	mediaListener,
	highlights = [],
	getHighlightColorBlended = blend,
	setCurrentTime,
	...props
}) => {
	const [value, setValue] = useState(0);
	const [duration, setDuration] = useState(0);
	const onCurrentTimeUpdate = (
		e: Event,
		newValue: number | number[],
		_activeThumb: number,
	) => {
		e.preventDefault();
		if (Array.isArray(newValue)) {
			return;
		}
		// Get new time according to played time from the total media duration
		const seekTime = (newValue / PROGRESS_BAR_DIVIDER) * duration;
		setCurrentTime?.(seekTime);
	};

	useMediaListener(
		'durationchange',
		e => setDuration(e.duration),
		mediaListener,
	);

	useMediaListener(
		'timeupdate',
		({ duration, seconds }) => {
			if (duration && seconds) {
				// Keep progress value as 0.01, 0.02, 0.03,
				// doing them as 0.0000001, 0.00121121 - you wont feel difference
				return setValue(
					toTwoDigits((seconds / duration) * PROGRESS_BAR_DIVIDER),
				);
			}
			return setValue(0);
		},
		mediaListener,
	);

	return (
		<EventRailsProvider
			highlights={highlights}
			duration={duration}
			getHighlightColorBlended={getHighlightColorBlended}
		>
			<ProgressBarStyled
				min={0}
				max={PROGRESS_BAR_DIVIDER}
				onChange={onCurrentTimeUpdate}
				value={value}
				components={{ Rail: EventRail }}
				{...props}
			/>
		</EventRailsProvider>
	);
};
