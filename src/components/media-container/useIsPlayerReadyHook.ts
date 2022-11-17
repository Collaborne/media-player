import { useEffect, useState } from 'react';

interface UseIsPlayerReadyHookProps {
	url?: string;
}
interface UseIsPlayerReadyHook {
	isPlayerReady: boolean;
}

export const useIsPlayerReadyHook = ({
	url,
}: UseIsPlayerReadyHookProps): UseIsPlayerReadyHook => {
	const [isPlayerReady, setIsPlayerReady] = useState(false);

	useEffect(() => {
		// If media is already loaded with one valid url, don't re-load player.
		if (isPlayerReady) {
			return;
		}
		if (url) {
			setIsPlayerReady(true);
		} else if (!url) {
			setIsPlayerReady(true);
		}
	}, [url, isPlayerReady, setIsPlayerReady]);

	return {
		isPlayerReady,
	};
};
