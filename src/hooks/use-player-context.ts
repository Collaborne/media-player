import { MutableRefObject, useCallback, useRef, useState } from 'react';

import { MediaStore } from '../store/video-store';

interface UsePlayerContext {
	onMediaStore: (store: MediaStore) => void;
	mediaContextRef: MutableRefObject<MediaStore | undefined>;
	mediaStore?: MediaStore;
}

export const usePlayerContext = (): UsePlayerContext => {
	// Rerender when video context exists/ready
	const [, setIsReady] = useState(false);
	const mediaContextRef = useRef<MediaStore>();
	const onMediaStore = useCallback((store?: MediaStore) => {
		mediaContextRef.current = store;
		if (store) {
			setIsReady(true);
		}
	}, []);
	const mediaStore = mediaContextRef.current;
	return {
		onMediaStore,
		mediaContextRef,
		mediaStore,
	};
};
