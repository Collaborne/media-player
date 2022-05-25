import { RefObject } from 'react';
import type ReactPlayer from 'react-player';
import { VideoState } from '.';

/**
 * Additional React-Player props for controlling video state
 */
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
