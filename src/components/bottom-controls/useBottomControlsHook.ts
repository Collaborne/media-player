import { useMediaStore } from '../../context/MediaProvider';

interface UseBottomControlsHook {
	hasStarted?: boolean;
}

export const useBottomControlsHook = (): UseBottomControlsHook => {
	const hasStarted = useMediaStore(state => state.hasPlayedOrSeeked);
	return { hasStarted };
};
