import { useVideoStore } from '../../context/VideoProvider';

interface UseBottomControlsHook {
	hasStarted?: boolean;
}

export const useBottomControlsHook = (): UseBottomControlsHook => {
	const hasStarted = useVideoStore(state => state.hasPlayedOrSeeked);
	return { hasStarted };
};
