import { RefObject } from 'react';
import type ReactPlayer from 'react-player';

import { MediaState } from '.';

/** Props that will be provided to ReactPlayer */
export interface ReactPlayerProps {
	autoPlay: boolean;
	playsinline: boolean;
	playbackRate: MediaState['playbackRate'];
	playing: MediaState['isPlaying'];
	muted: MediaState['isMuted'];
	volume: MediaState['volume'];
	ref: RefObject<ReactPlayer>;
	onReady: () => void;
	onEnded: () => void;
	onDuration: (duration: MediaState['duration']) => void;
	onProgress: ({ playedSeconds }: Record<'playedSeconds', number>) => void;
}
