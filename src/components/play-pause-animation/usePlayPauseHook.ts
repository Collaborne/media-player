import { useVideo } from '../../hooks';
import { VideoApi } from '../../types';

import { usePlayPauseAnimationStyles } from './usePlayPauseAnimationStyles';

interface UsePlayPauseHook {
	centeredIcon: string;
	isPlaying: boolean;
	api?: VideoApi;
	hasStarted?: boolean;
}

export const usePlayPauseHook = (): UsePlayPauseHook => {
	const { api } = useVideo();

	const { centeredIcon } = usePlayPauseAnimationStyles().classes;
	const isPlaying = Boolean(api?.getPlaying?.());
	const hasStarted = api?.getHasPlayedOrSeeked?.();
	return {
		centeredIcon,
		isPlaying,
		hasStarted,
		api,
	};
};
