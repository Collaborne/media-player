import { MediaType } from '../../../types/media-type';
import { isAudio, isUrlSupported } from '../../../utils/is-url-supported';

interface UseCorePlayerHookProps {
	url?: string;
	initialMediaType?: string;
}

export function getMediaType({
	url,
	initialMediaType,
}: UseCorePlayerHookProps): MediaType {
	if (!url) {
		return 'unknown';
	}
	// If mediaType was initialized external => we use it
	if (initialMediaType) {
		if (initialMediaType.startsWith('audio/')) {
			return 'audio';
		} else if (initialMediaType.startsWith('video/')) {
			return 'video';
		} else {
			return 'unknown';
		}
	}
	// Otherwise we define it from URL
	if (isUrlSupported(url)) {
		if (isAudio(url)) {
			return 'audio';
		}
		return 'video';
	}

	return 'unknown';
}
