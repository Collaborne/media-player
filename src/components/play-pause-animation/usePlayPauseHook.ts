import { useMediaStore } from '../../context';

import { usePlayPauseAnimationStyles } from './usePlayPauseAnimationStyles';

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
