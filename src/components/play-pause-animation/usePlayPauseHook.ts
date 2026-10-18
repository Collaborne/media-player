import { useMediaStore } from '../../context/index.js';

import { usePlayPauseAnimationStyles } from './usePlayPauseAnimationStyles.js';

interface UsePlayPauseHook {
	centeredIcon: string;
	isPlaying: boolean;
	hasStarted?: boolean;
}

export const usePlayPauseHook = (): UsePlayPauseHook => {
	const isPlaying = useMediaStore(state => state.isPlaying);
	const hasStarted = useMediaStore(state => state.hasPlayedOrSeeked);

	const { centeredIcon } = usePlayPauseAnimationStyles().classes;

	return {
		centeredIcon,
		isPlaying,
		hasStarted,
	};
};
