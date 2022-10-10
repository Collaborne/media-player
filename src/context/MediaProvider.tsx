/**
 * Context Provider for playing medias
 */

import { FC, useRef } from 'react';
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
		'onStoreUpdate' | 'highlights'
	> {}

/** A provider that should wrap MediaContainer for context consuming */
export const MediaProvider: FC<MediaProviderProps> = ({
	initialState,
	getHighlightColorBlended,
	children,
	onStoreUpdate,
	highlights,
}) => {
	const reactPlayerRef = useRef<ReactPlayer>(null);
	const playPromiseRef = useRef<Promise<void>>();
	const mediaContainerRef = useRef<HTMLDivElement>(null);
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
