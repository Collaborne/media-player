import { MutableRefObject, useCallback, useRef, useState } from 'react';

import { MediaStore } from '../store/media-store';

interface UsePlayerContext {
	setMediaContext: (context: MediaStore) => void;
	mediaContextRef: MutableRefObject<MediaStore | undefined>;
	mediaContext?: MediaStore;
}

/**
 * Get the player store external, via assigning it to a `ref` for optimization
 * @category hooks
 * @category MediaStore
 */
export const usePlayerContext = (): UsePlayerContext => {
	// Rerender when media context exists/ready
	const [, setIsReady] = useState(false);
	const mediaContextRef = useRef<MediaStore>();
	const setMediaContext = useCallback((store?: MediaStore) => {
		mediaContextRef.current = store;
		if (store) {
			setIsReady(true);
		}
	}, []);
	const mediaContext = mediaContextRef.current;
	return {
		setMediaContext,
		mediaContextRef,
		mediaContext,
	};
};
