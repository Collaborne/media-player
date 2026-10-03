import { ReactEventHandler, RefObject } from 'react';

import { MediaState } from '.';

/**
 * Props that will be provided to ReactPlayer
 * @category MediaStore
 */
export interface ReactPlayerProps {
	autoPlay: boolean;
	playsInline: boolean;
	playbackRate: MediaState['playbackRate'];
	playing: MediaState['isPlaying'];
	muted: MediaState['isMuted'];
	volume: MediaState['volume'];
	ref: RefObject<HTMLVideoElement | null>;
	onReady: () => void;
	onEnded: () => void;
	onDurationChange: ReactEventHandler<HTMLVideoElement>;
	onTimeUpdate: ReactEventHandler<HTMLVideoElement>;
}
