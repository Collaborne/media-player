import { useMediaStore } from '../context/MediaProvider';
import { SupportedMediaType } from '../types';

/**
 * Selector for `mediaType` from `MediaStore`
 * @category hooks
 * @category MediaStore
 */
export const useMediaType = (): { mediaType: SupportedMediaType } => {
	const mediaType = useMediaStore(state => state.mediaType);

	return { mediaType };
};
