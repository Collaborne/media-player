import { useVideo } from '../../hooks/use-video';

interface UseBottomControlButtonsHook {
	showControls?: boolean;
	hasStarted?: boolean;
}

export const useBottomControlButtonsHook = (): UseBottomControlButtonsHook => {
	const { api } = useVideo();
	const showControls = api?.getShowControls?.();
	const hasStarted = api?.getHasPlayedOrSeeked?.();
	return { hasStarted, showControls };
};
