import { useVideo } from '../../hooks';

interface UseBottomControlsHook {
	hasStarted?: boolean;
}

export const useBottomControlsHook = (): UseBottomControlsHook => {
	const { api } = useVideo();
	const hasStarted = api?.getHasPlayedOrSeeked?.();
	return { hasStarted };
};
