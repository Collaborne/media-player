import { useMediaType } from './use-media-type';

/**
 * Determine if file extension belongs to audio or not (get form `useMediaType` selector)
 * @category hooks
 */
export const useIsAudio = () => {
	const { mediaType } = useMediaType();
	const isAudio = mediaType === 'audio';
	return isAudio;
};
