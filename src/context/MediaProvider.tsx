/**
 * Context Provider for isPlaying medias
 */

import {
	FC,
	useCallback,
	useRef,
	createContext,
	useContext,
	ReactNode,
} from 'react';
import ReactPlayer from 'react-player';
import { StoreApi, useStore } from 'zustand';

import { CorePlayerInitialState } from '../components';
import { createMediaStore, MediaStore } from '../store/media-store';
import { Highlight, MediaType, StateSelector } from '../types';
import { BlendColors, DEFAULT_MEDIA_STORE_CONTEXT } from '../utils';

import { HighlightsProvider } from './HighlightsProvider';

const MediaStoreContext = createContext<StoreApi<MediaStore>>({
	getState: () => DEFAULT_MEDIA_STORE_CONTEXT,
	setState: () => DEFAULT_MEDIA_STORE_CONTEXT,
	subscribe: () => () => [],
	destroy: () => () => [],
});

export interface MediaProviderProps {
	isAudio: boolean;
	mediaType: MediaType;
	isPipEnabled: boolean;
	/** Highlights to be displayed in the scrub bar */
	highlights?: Highlight[];
	/** Blend highlights colors in the scrub bar */
	getHighlightColorBlended?: BlendColors;
	/** Callback for media store update */
	onStoreUpdate?: (store: MediaStore) => void;
	/** `CorePlayer` initial state */
	initialState: CorePlayerInitialState;
	/** Trigger points (in sec) when an alert event is emitted */
	alarms?: number[];
	children: ReactNode;
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
	isPipEnabled = true,
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
			isPipEnabled,
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
