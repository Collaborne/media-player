import { useVideo } from '../../hooks/use-video';

interface UseBottomControlPanelHook {
	showControls?: boolean;
	hasStarted?: boolean;
}

export const useBottomControlPanelHook = (): UseBottomControlPanelHook => {
	const { api } = useVideo();
	const showControls = api?.getShowControls?.();
	const hasStarted = api?.getHasPlayedOrSeeked?.();
	return { hasStarted, showControls };
};
