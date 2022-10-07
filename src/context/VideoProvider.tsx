/**
 * Context Provider for playing videos
 */

import { ReactNode, FC, useRef } from 'react';
import ReactPlayer from 'react-player';
import { StoreApi } from 'zustand';
import createContext from 'zustand/context';

import { CorePlayerInitialState } from '../components/core-player/types';
import {
	createMediaStore,
	PropsToState,
	VideoSettersSlice,
	MediaStore,
} from '../store/video-store';
import { MediaState, Highlight } from '../types';
import { BlendColors } from '../utils/colors';

import { HighlightsProvider } from './HighlightsProvider';

const { Provider, useStore } =
	createContext<StoreApi<MediaState & VideoSettersSlice & PropsToState>>();
export interface VideoProviderProps {
	/** Provider's initialization state */
	initialState: CorePlayerInitialState;
	/** State that needs to be stored in localStorage */
	persistedState?: MediaState;
	/** Blending colors for highlights presented in `<ProgressBar>` */
	getHighlightColorBlended: BlendColors;
	/** A callback that can updates VideoContext outside of the VideoProvider */
	onStoreUpdate?: (store: MediaStore) => void;
	highlights?: Highlight[];
	/** ReactNode that will consume the context */
	children: ReactNode;
}

/** A provider that should wrap VideoContainer for context consuming */
export const VideoProvider: FC<VideoProviderProps> = ({
	initialState,
	children,
	getHighlightColorBlended,
	onStoreUpdate,
	highlights,
}) => {
	const reactPlayerRef = useRef<ReactPlayer>(null);
	const playPromiseRef = useRef<Promise<void>>();
	const videoContainerRef = useRef<HTMLDivElement>(null);
	return (
		<HighlightsProvider highlights={highlights}>
			<Provider
				createStore={() =>
					createMediaStore({
						initialState,
						getHighlightColorBlended,
						playPromiseRef,
						reactPlayerRef,
						videoContainerRef,
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
VideoProvider.displayName = 'VideoProvider';
