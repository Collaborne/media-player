import { MutableRefObject, useCallback, useRef } from 'react';

import { VideoContext } from '../context';
import { VideoApi } from '../types';

interface UsePlayerContext {
	setVideoContext: (context?: VideoContext) => void;
	videoContextRef: MutableRefObject<VideoContext | undefined>;
	videoContextApi?: VideoApi;
}

export const usePlayerContext = (): UsePlayerContext => {
	const videoContextRef = useRef<VideoContext>();
	const setVideoContext = useCallback((context?: VideoContext) => {
		videoContextRef.current = context;
	}, []);
	const videoContextApi = videoContextRef.current?.api;
	return {
		setVideoContext,
		videoContextRef,
		videoContextApi,
	};
};
