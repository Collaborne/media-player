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

	return (
		<HighlightsProvider highlights={highlights}>
			<MediaStoreContext.Provider
				value={createMediaStore({
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
				})}
			>
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
type ExtractState<S> = S extends {
	getState: () => infer T;
}
	? T
	: never;
type WithReact<S extends StoreApi<unknown>> = S & {
	getServerState?: () => ExtractState<S>;
};

export function useMediaStore<TState, StateSlice>(selector, equalityFn) {
	const context = useContext<StoreApi<MediaStore>>(MediaStoreContext);
	if (!context) {
		throw new Error('useMediaStore must be used in a MediaProvider ');
	}

	const store = useStore(context, selector, equalityFn);
	return store;
}

// type ExtractState<S> = S extends {
// 	getState: () => infer T;
// }
// 	? T
// 	: never;

// type WithReact<S extends StoreApi<unknown>> = S & {
// 	getServerState?: () => ExtractState<S>;
// };
// // /<S extends WithReact<StoreApi<unknown>>, U>(api: S, selector: (state: ExtractState<S>) => U, equalityFn?: (a: U, b: U) => boolean): U;
// export function useMediaStore<S extends WithReact<StoreApi<MediaStore>>, U>(
// 	selector: (state: ExtractState<S>) => U,
// 	equalityFn?: (a: U, b: U) => boolean,
// ): U {
// 	const store = useMediaStoreContext();
// 	return useStore(store, selector, equalityFn);
// }

// type MediaStoreKey = keyof MediaStore;
// const a: MediaStore[MediaStoreKey] = {};
