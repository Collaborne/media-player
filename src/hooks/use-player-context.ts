import { MutableRefObject, useCallback, useRef, useState } from 'react';

import { VideoContext } from '../context';
import { VideoApi } from '../types';

interface UsePlayerContext {
	setVideoContext: (context?: VideoContext) => void;
	videoContextRef: MutableRefObject<VideoContext | undefined>;
	videoContextApi?: VideoApi;
}

export const usePlayerContext = (): UsePlayerContext => {
	// Rerender when video context exists/ready
	const [, setIsReady] = useState(false);
	const videoContextRef = useRef<VideoContext>();
	const setVideoContext = useCallback((context?: VideoContext) => {
		videoContextRef.current = context;
		if (context) {
			setIsReady(true);
		}
	}, []);
	const videoContextApi = videoContextRef.current?.api;
	return {
		setVideoContext,
		videoContextRef,
		videoContextApi,
	};
};
