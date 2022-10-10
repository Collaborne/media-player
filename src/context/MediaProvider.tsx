/**
 * Context Provider for playing medias
 */

import { ReactNode, FC, useRef } from 'react';
import ReactPlayer from 'react-player';
import { StoreApi } from 'zustand';
import createContext from 'zustand/context';

import { CorePlayerInitialState } from '../components/core-player/types';
import {
	createMediaStore,
	PropsToState,
	MediaSettersSlice,
	MediaStore,
} from '../store/media-store';
import { MediaState, Highlight } from '../types';
import { BlendColors } from '../utils/colors';

import { HighlightsProvider } from './HighlightsProvider';

const { Provider, useStore } =
	createContext<StoreApi<MediaState & MediaSettersSlice & PropsToState>>();
export interface MediaProviderProps {
	/** Provider's initialization state */
	initialState: CorePlayerInitialState;
	/** State that needs to be stored in localStorage */
	persistedState?: MediaState;
	/** Blending colors for highlights presented in `<ProgressBar>` */
	getHighlightColorBlended: BlendColors;
	/** A callback that can updates MediaContext outside of the MediaProvider */
	onStoreUpdate?: (store: MediaStore) => void;
	highlights?: Highlight[];
	/** ReactNode that will consume the context */
	children: ReactNode;
}

/** A provider that should wrap MediaContainer for context consuming */
export const MediaProvider: FC<MediaProviderProps> = ({
	initialState,
	children,
	getHighlightColorBlended,
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
