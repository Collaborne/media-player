/**
 * Context Provider for isPlaying medias
 */

import { FC, useCallback, useRef } from 'react';
import ReactPlayer from 'react-player';
import { StoreApi } from 'zustand';
import createContext from 'zustand/context';

import { CorePlayerProps } from '../components';
import { createMediaStore, MediaStore } from '../store/media-store';
import { RequiredAndOptionalPick } from '../types';

import { HighlightsProvider } from './HighlightsProvider';

const { Provider, useStore } = createContext<StoreApi<MediaStore>>();

export interface MediaProviderProps
	extends RequiredAndOptionalPick<
		CorePlayerProps,
		'initialState' | 'getHighlightColorBlended' | 'children',
		'onStoreUpdate' | 'highlights' | 'alarms'
	> {}

/** A provider that should wrap MediaContainer for context consuming */
export const MediaProvider: FC<MediaProviderProps> = ({
	initialState,
	getHighlightColorBlended,
	children,
	onStoreUpdate,
	highlights,
	alarms = [],
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
			<Provider
				createStore={() =>
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
					})
				}
			>
				{children}
			</Provider>
		</HighlightsProvider>
	);
};

export const useMediaStore = useStore;
MediaProvider.displayName = 'MediaProvider';
