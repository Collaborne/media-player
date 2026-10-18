import { useMediaStore } from '../../context/MediaProvider.js';

interface UseBottomControlButtonsHook {
	showControls?: boolean;
	hasStarted?: boolean;
}

export const useBottomControlButtonsHook = (): UseBottomControlButtonsHook => {
	const showControls = useMediaStore(state => state.showControls);
	const hasStarted = useMediaStore(state => state.hasPlayedOrSeeked);

	return { hasStarted, showControls };
};
