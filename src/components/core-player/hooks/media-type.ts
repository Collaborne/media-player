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
		return initialMediaType.startsWith('audio/') ? 'audio' : 'video';
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
