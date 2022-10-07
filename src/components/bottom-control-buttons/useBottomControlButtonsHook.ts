import { useMediaStore } from '../../context/VideoProvider';

interface UseBottomControlButtonsHook {
	showControls?: boolean;
	hasStarted?: boolean;
}

export const useBottomControlButtonsHook = (): UseBottomControlButtonsHook => {
	const showControls = useMediaStore(state => state.showControls);
	const hasStarted = useMediaStore(state => state.hasPlayedOrSeeked);

	return { hasStarted, showControls };
};
