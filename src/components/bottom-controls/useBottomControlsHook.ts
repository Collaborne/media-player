import { useMediaStore } from '../../context/VideoProvider';

interface UseBottomControlsHook {
	hasStarted?: boolean;
}

export const useBottomControlsHook = (): UseBottomControlsHook => {
	const hasStarted = useMediaStore(state => state.hasPlayedOrSeeked);
	return { hasStarted };
};
