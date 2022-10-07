import { RefObject, MutableRefObject } from 'react';
import type ReactPlayer from 'react-player';

import { CorePlayerInitialState } from '../components';
import { MediaStore } from '../store/video-store';
import { BlendColors } from '../utils/colors';

export interface MediaStateExternalInitializers {
	reactPlayerRef: RefObject<ReactPlayer>;
	playPromiseRef: MutableRefObject<Promise<void> | undefined>;
	videoContainerRef: RefObject<HTMLDivElement>;
	initialState: CorePlayerInitialState;
	getHighlightColorBlended?: BlendColors;
	onStoreUpdate?: (store: MediaStore) => void;
}
