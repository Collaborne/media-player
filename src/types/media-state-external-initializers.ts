import { RefObject, MutableRefObject } from 'react';
import type ReactPlayer from 'react-player';

import { MediaStore } from '../store/media-store';
import { BlendColors } from '../utils/colors';

import { MediaType } from './media-type';

/**
 * State that initializes store external
 * @category MediaStore
 */
export interface MediaStateExternalInitializers {
	reactPlayerRef: RefObject<ReactPlayer | null>;
	playPromiseRef: MutableRefObject<Promise<void> | undefined>;
	mediaContainerRef: RefObject<HTMLDivElement | null>;
	getHighlightColorBlended?: BlendColors;
	onStoreUpdate?: (store: MediaStore) => void;
	/** Trigger points (in sec) when an alert event is emitted */
	alarms: number[];
	/** Marks mouse activity */
	markActivity: VoidFunction;
	/** Store last mouse activity */
	lastActivityRef: RefObject<number>;
	/** Marks mouse activity for the PIP player */
	markPipActivity: VoidFunction;
	/** Store last mouse activity of the PIP player */
	lastPipActivityRef: RefObject<number>;
	mediaType: MediaType;
	isAudio: boolean;
	isPipEnabled: boolean;
}
