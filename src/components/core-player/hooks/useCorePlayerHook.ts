import { useMemo } from 'react';

import { MediaType } from '../../../types/media-type.js';

import { getMediaType } from './media-type.js';

interface UseCorePlayerHookProps {
	url?: string;
	initialMediaType?: string;
}
interface UseCorePlayerHook {
	mediaType: MediaType;
}

export const useCorePlayerHook = ({
	url,
	initialMediaType,
}: UseCorePlayerHookProps): UseCorePlayerHook => {
	const mediaType = useMemo(
		() => getMediaType({ url, initialMediaType }),
		[url, initialMediaType],
	);
	return { mediaType };
};
