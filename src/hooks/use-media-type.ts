import { useMediaStore } from '../context/MediaProvider.js';
import { MediaType } from '../types/index.js';

/**
 * Selector for `mediaType` from `MediaStore`
 * @category hooks
 * @category MediaStore
 */
export const useMediaType = (): { mediaType: MediaType } => {
	const mediaType = useMediaStore(state => state.mediaType);

	return { mediaType };
};
