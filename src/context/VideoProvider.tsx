/**
 * Context Provider for playing videos
 */

import { ReactNode, FC, useRef } from 'react';
import ReactPlayer from 'react-player';
import { StoreApi } from 'zustand';
import createContext from 'zustand/context';

import { CorePlayerInitialState } from '../components/core-player/types';
import {
	createVideoStore,
	PropsToState,
	VideoSettersSlice,
} from '../store/video-store';
import { VideoState, Highlight } from '../types';
import { BlendColors } from '../utils/colors';

import { VideoContext } from './video';

const { Provider, useStore } =
	createContext<StoreApi<VideoState & VideoSettersSlice & PropsToState>>();
export interface VideoProviderProps {
	/** Provider's initialization state */
	initialState: CorePlayerInitialState;
	/** State that needs to be stored in localStorage */
	persistedState?: VideoState;
	/** Blending colors for highlights presented in `<ProgressBar>` */
	getHighlightColorBlended: BlendColors;
	/** A callback that can updates VideoContext outside of the VideoProvider */
	onContext?: (context: VideoContext) => void;
	highlights?: Highlight[];
	/** ReactNode that will consume the context */
	children: ReactNode;
}

/** A provider that should wrap VideoContainer for context consuming */
export const VideoProvider: FC<VideoProviderProps> = ({
	initialState,
	children,
	getHighlightColorBlended,
	// onContext,
	highlights,
}) => {
	const reactPlayerRef = useRef<ReactPlayer>(null);
	const playPromiseRef = useRef<Promise<void>>();
	const videoContainerRef = useRef<HTMLDivElement>(null);

	return (
		<Provider
			createStore={() =>
				createVideoStore({
					initialState,
					getHighlightColorBlended,
					highlights,
					playPromiseRef,
					reactPlayerRef,
					videoContainerRef,
				})
			}
		>
			{children}
		</Provider>
	);
};

export const useVideoStore = useStore;
VideoProvider.displayName = 'VideoProvider';
