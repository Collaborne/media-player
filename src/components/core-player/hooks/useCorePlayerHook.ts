import { useMemo } from 'react';

import { MediaType } from '../../../types/media-type';

import { getMediaType } from './media-type';

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
