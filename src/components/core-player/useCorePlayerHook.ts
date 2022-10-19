import { useEffect, useState } from 'react';
import { MediaType } from '../../types/media-type';
import { isMP4AudioOnly } from '../../utils/is-mp4-audio-only';

interface UseCorePlayerHookProps {
	url?: string;
}
interface UseCorePlayerHook {
	mediaType?: MediaType;
}

export const useCorePlayerHook = ({
	url,
}: UseCorePlayerHookProps): UseCorePlayerHook => {
	const [mediaType, setMediaType] = useState<MediaType | undefined>();
	useEffect(() => {
		async function checkMediaType() {
			if (url) {
				const isAudioOnly = await isMP4AudioOnly(url);
				if (isAudioOnly) {
					return setMediaType('audio');
				}
				setMediaType('video');
			}
		}
		void checkMediaType();
	}, [url]);
	return { mediaType };
};
