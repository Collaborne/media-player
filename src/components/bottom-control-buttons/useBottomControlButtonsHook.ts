import { useVideoStore } from '../../context/VideoProvider';

interface UseBottomControlButtonsHook {
	showControls?: boolean;
	hasStarted?: boolean;
}

export const useBottomControlButtonsHook = (): UseBottomControlButtonsHook => {
	const showControls = useVideoStore(state => state.showControls);
	const hasStarted = useVideoStore(state => state.hasPlayedOrSeeked);

	return { hasStarted, showControls };
};
