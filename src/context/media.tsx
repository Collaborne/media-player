import { RefObject, createContext } from 'react';
import type ReactPlayer from 'react-player';

import { CorePlayerProps } from '../components/core-player/CorePlayer';
import {
	FullscreenApi,
	Highlight,
	ReactPlayerProps,
	MediaApi,
	MediaState,
} from '../types';

export interface MediaContext {
	/** A collection of getters, setters, emitters for the media  */
	api?: MediaApi;
	/** Props that will be provided to ReactPlayer */
	reactPlayerProps?: ReactPlayerProps;
	/** Media state */
	state?: MediaState;
	/** Instance ref for the ReactPlayer */
	reactPlayerRef?: RefObject<ReactPlayer>;
	/** Ref to the container of the <media>. Used mostly for fullscreen */
	mediaContainerRef: RefObject<HTMLDivElement>;
	/** Fullscreen API getter and setters */
	fullScreenApi?: FullscreenApi;
	/** Blending colors for highlights presented in `<ProgressBar` */
	getHighlightColorBlended?: CorePlayerProps['getHighlightColorBlended'];
	/** Blending colors for highlights presented in `<ProgressBar` */
	onContext?: (context: MediaContext) => void;
	highlights?: Highlight[];
}

/** A React Context - to share media api through components */
export const MediaContext = createContext<MediaContext | null>(null);
