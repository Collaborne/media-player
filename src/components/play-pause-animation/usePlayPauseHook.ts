import { useVideoStore } from '../../context';

import { usePlayPauseAnimationStyles } from './usePlayPauseAnimationStyles';

interface UsePlayPauseHook {
	centeredIcon: string;
	isPlaying: boolean;
	hasStarted?: boolean;
}

export const usePlayPauseHook = (): UsePlayPauseHook => {
	const isPlaying = useVideoStore(state => state.playing);
	const hasStarted = useVideoStore(state => state.hasPlayedOrSeeked);

	const { centeredIcon } = usePlayPauseAnimationStyles().classes;

	return {
		centeredIcon,
		isPlaying,
		hasStarted,
	};
};
