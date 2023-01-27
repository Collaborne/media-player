/**
 * Context Provider for isPlaying medias
 */

import { FC, useCallback, useRef, createContext, useContext } from 'react';
import ReactPlayer from 'react-player';
import { StoreApi, useStore } from 'zustand';

import { CorePlayerProps } from '../components';
import { createMediaStore, MediaStore } from '../store/media-store';
import { MediaType, RequiredAndOptionalPick } from '../types';
import { DEFAULT_MEDIA_STORE_CONTEXT } from '../utils';

import { HighlightsProvider } from './HighlightsProvider';

const MediaStoreContext = createContext<MediaStore>(
	DEFAULT_MEDIA_STORE_CONTEXT,
);

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

	const store = useRef(
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
		})(),
	);

	return (
		<HighlightsProvider highlights={highlights}>
			<MediaStoreContext.Provider value={store.current}>
				{children}
			</MediaStoreContext.Provider>
		</HighlightsProvider>
	);
};

/**
 * A hook for `MediaStore` from `zustand` to use for `MediaProvider` consumers
 * Use it, like an ordinary `zustand` store: https://github.com/pmndrs/zustand
 * @category hooks
 * @category MediaStore
 */

export const useMediaStoreContext = () => {
	const context = useContext<MediaStore>(MediaStoreContext);
	if (!context) {
		throw new Error('useMediaStore must be used in a MediaProvider ');
	}
	return context;
};

type ExtractState<S> = S extends {
	getState: () => infer T;
}
	? T
	: never;

// export declare function useMediaStore<
// 	S extends WithReact<StoreApi<unknown>>,
// 	U,
// >(
// 	api: S,
// 	selector: (state: ExtractState<S>) => U,
// 	equalityFn?: (a: U, b: U) => boolean,
// ): U;

export function useMediaStore<U extends MediaStore[keyof MediaStore]>(
	selector: (state: ExtractState<MediaStore>) => U,
	equalityFn?: (a: U, b: U) => boolean,
): U {
	const store = useMediaStoreContext();
	return useStore(store as any, selector as any, equalityFn);
}
