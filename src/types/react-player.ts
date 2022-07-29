import { RefObject } from 'react';
import type ReactPlayer from 'react-player';

import { VideoState } from '.';

/** Props that will be provided to ReactPlayer */
export interface ReactPlayerProps {
	autoPlay: boolean;
	playsinline: boolean;
	playbackRate: VideoState['playbackRate'];
	playing: VideoState['playing'];
	muted: VideoState['muted'];
	volume: VideoState['volume'];
	ref: RefObject<ReactPlayer>;
	onReady: () => void;
	onEnded: () => void;
	onDuration: (duration: VideoState['duration']) => void;
	onProgress: ({ playedSeconds }: Record<'playedSeconds', number>) => void;
}
