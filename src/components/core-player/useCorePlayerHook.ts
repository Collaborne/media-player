import { useEffect, useState } from 'react';

import { MediaType } from '../../types/media-type';
import { isAudio, isUrlSupported } from '../../utils/is-url-supported';

interface UseCorePlayerHookProps {
	url?: string;
	initialMediaType?: MediaType;
}
interface UseCorePlayerHook {
	mediaType: MediaType;
}

export const useCorePlayerHook = ({
	url,
	initialMediaType,
}: UseCorePlayerHookProps): UseCorePlayerHook => {
	const [mediaType, setMediaType] = useState<MediaType>('unknown');
	useEffect(() => {
		if (!url) {
			return;
		}
		// If mediaType was initialized external => we use it
		if (initialMediaType) {
			return setMediaType(initialMediaType);
		}
		// Otherwise we define it from URL
		if (isUrlSupported(url)) {
			if (isAudio(url)) {
				return setMediaType('audio');
			}
			return setMediaType('video');
		}
	}, [url, initialMediaType]);
	return { mediaType };
};
