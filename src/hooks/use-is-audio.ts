import { useMediaStore } from '../context/MediaProvider';

/**
 * Selector for `isAudio` from `MediaStore`
 * @category hooks
 * @category MediaStore
 */
export const useIsAudio = () => {
	const isAudio = useMediaStore(state => state.isAudio);
	return isAudio;
};
