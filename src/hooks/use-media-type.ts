import { useMediaStore } from '../context/MediaProvider';
import { MediaType } from '../types';

/**
 * Selector for `mediaType` from `MediaStore`
 * @category hooks
 * @category MediaStore
 */
export const useMediaType = (): { mediaType: MediaType } => {
	const mediaType = useMediaStore(state => state.mediaType);

	return { mediaType };
};
