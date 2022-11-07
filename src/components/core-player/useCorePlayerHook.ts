import { useEffect, useState } from 'react';

import { MediaType } from '../../types/media-type';
import { isAudio, isUrlSupported } from '../../utils/is-url-supported';

interface UseCorePlayerHookProps {
	url?: string;
}
interface UseCorePlayerHook {
	mediaType: MediaType;
}

export const useCorePlayerHook = ({
	url,
}: UseCorePlayerHookProps): UseCorePlayerHook => {
	const [mediaType, setMediaType] = useState<MediaType>('unknown');
	useEffect(() => {
		if (!url) {
			return;
		}
		if (isUrlSupported(url)) {
			if (isAudio(url)) {
				return setMediaType('audio');
			}
			return setMediaType('video');
		}
	}, [url]);
	return { mediaType };
};
