/**
 * Context Provider for isPlaying medias
 */

import { FC, useCallback, useRef, createContext, useContext } from 'react';
import ReactPlayer from 'react-player';
import { StoreApi, useStore } from 'zustand';

import { CorePlayerProps } from '../components';
import { createMediaStore, MediaStore } from '../store/media-store';
import { MediaType, RequiredAndOptionalPick, StateSelector } from '../types';
import { DEFAULT_MEDIA_STORE_CONTEXT } from '../utils';

import { HighlightsProvider } from './HighlightsProvider';

const MediaStoreContext = createContext<StoreApi<MediaStore>>({
	getState: () => DEFAULT_MEDIA_STORE_CONTEXT,
	setState: () => DEFAULT_MEDIA_STORE_CONTEXT,
	subscribe: () => () => [],
	destroy: () => () => [],
});

export interface MediaProviderProps
	extends RequiredAndOptionalPick<
		CorePlayerProps,
		'initialState' | 'getHighlightColorBlended' | 'children',
		'onStoreUpdate' | 'highlights' | 'alarms'
	> {
	isAudio: boolean;
	mediaType: MediaType;
}

/** Keep `MediaStore` in a context to distribute them to UI Controls
 * @category ContextProvider
 */
export const MediaProvider: FC<MediaProviderProps> = ({
	initialState,
	getHighlightColorBlended,
	children,
	onStoreUpdate,
	highlights,
	alarms = [],
	isAudio,
	mediaType,
}) => {
	const reactPlayerRef = useRef<ReactPlayer>(null);
	const playPromiseRef = useRef<Promise<void>>();
	const mediaContainerRef = useRef<HTMLDivElement>(null);
	const lastActivityRef = useRef<number>(0);
	const lastPipActivityRef = useRef<number>(0);
	const markActivity = useCallback(() => {
		if (lastActivityRef) {
			lastActivityRef.current = Date.now();
		}
	}, []);
	const markPipActivity = useCallback(() => {
		if (lastPipActivityRef) {
			lastPipActivityRef.current = Date.now();
		}
	}, []);

	const contextValueRef = useRef(
		createMediaStore({
			initialState,
			getHighlightColorBlended,
			playPromiseRef,
			reactPlayerRef,
			mediaContainerRef,
			onStoreUpdate,
			alarms,
			lastActivityRef,
			markActivity,
			lastPipActivityRef,
			markPipActivity,
			mediaType,
			isAudio,
		}),
	);

	return (
		<HighlightsProvider highlights={highlights}>
			<MediaStoreContext.Provider value={contextValueRef.current}>
				{children}
			</MediaStoreContext.Provider>
		</HighlightsProvider>
	);
};

/**
 * A hook to consume MediaStore.
 * Must be used only for components that are Consumers of MediaProvider
 * @category hooks
 * @category MediaStore
 */

export const useMediaStore = <StateSlice,>(
	selector?: StateSelector<MediaStore, StateSlice>,
	equalityFn = Object.is,
): StateSlice => {
	const context = useContext(MediaStoreContext);
	if (!context) {
		throw Error('useMediaStore cannot be used outside of the MediaProvider');
	}

	return useStore(
		context,
		selector as StateSelector<MediaStore, StateSlice>,
		equalityFn,
	);
};
