import { useMediaType } from './use-media-type';

export const useIsAudio = () => {
	const { mediaType } = useMediaType();
	const isAudio = mediaType === 'audio';
	return isAudio;
};
