import React from 'react';

import {
	TimeUpdateEvent,
	useDelayedState,
	useVideoListener,
	VideoPlayer,
	usePlayerContext,
} from '../../src';
import { Karaoke } from '../components/karaoke/Karaoke';
import { createTimestamps } from '../components/karaoke/utils';
import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';

import { findMatchingPartOrNext, Transcript } from './shared/transcript';

interface KaraokeModeProps {
	secondsDivider: number;
	videoUrl: string;
}

export const KaraokeMode: React.FC<KaraokeModeProps> = args => {
	const { onMediaStore, mediaStore } = usePlayerContext();

	const videoDuration = mediaStore?.duration || 0;
	const [isPlaying, setIsPlaying] = useDelayedState(false);
	const [transcript, setTranscript] = useDelayedState<Transcript[]>([]);
	const listener = mediaStore?.getListener();
	const [currentPart, setCurrentPart] = useDelayedState<Transcript>({
		index: 0,
		end: 0,
		start: 0,
	});

	const getCurrentTimePart = React.useCallback(() => {
		const videoEl = mediaStore?.reactPlayerRef?.current?.getInternalPlayer();
		if (!videoEl) {
			return;
		}

		return findMatchingPartOrNext(transcript, videoEl.currentTime * 1000 - 1);
	}, [mediaStore, transcript]);

	const onSeek = React.useCallback(() => {
		const curPart = getCurrentTimePart();
		if (curPart) {
			setCurrentPart(curPart, 1);
		}
	}, [getCurrentTimePart, setCurrentPart]);

	useVideoListener('play', () => setIsPlaying(true, 1), listener);
	useVideoListener('pause', () => setIsPlaying(false, 1), listener);
	useVideoListener('seeked', onSeek, listener);
	useVideoListener(
		'timeupdate',
		(e: TimeUpdateEvent) => {
			console.log('=====SEARCH', e.seconds);
			if (currentPart.start - 0.2 < e.seconds && currentPart.end > e.seconds) {
				console.log(
					`=====SEARCH declined AT: currentTime${e.seconds} for [ ${currentPart.start}, ${currentPart.end}]`,
				);
				return;
			}
			console.log(
				`=====SEARCH accepted for : currentTime${e.seconds} for [ ${currentPart.start}, ${currentPart.end}]`,
			);
			const res = findMatchingPartOrNext(transcript, e.seconds);
			setCurrentPart(res, 1);
		},
		listener,
	);
	// Create random timestamps due to video duration
	React.useEffect(() => {
		setTranscript(createTimestamps(videoDuration, args.secondsDivider));
	}, [videoDuration, args.secondsDivider]);

	return (
		<div>
			<VideoPlayer videoUrl={args.videoUrl} onStoreUpdate={onMediaStore} />
			<Karaoke
				isPlaying={isPlaying}
				requestPip={mediaStore?.requestPip}
				setCurrentTime={mediaStore?.setCurrentTime}
				transcripts={transcript}
				activeTranscript={currentPart}
			/>
		</div>
	);
};

export default {
	title: 'Karaoke Mode',
	component: KaraokeMode,
	decorators: [withDemoCard, withPlayerTheme],
	args: {
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		secondsDivider: 2,
	},
	argTypes: {
		videoUrl: {
			name: 'videoUrl',
			description: 'A video URL. Only file type supported',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: undefined },
			},
		},
		secondsDivider: {
			name: 'secondsDivider',
			description: 'Split 1 second into intervals.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 2 },
			},
		},
	},
};
