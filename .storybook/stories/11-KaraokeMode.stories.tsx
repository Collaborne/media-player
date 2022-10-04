import React from 'react';

import {
	TimeUpdateEvent,
	useDelayedState,
	useVideoListener,
	VideoPlayer,
	usePlayerContext,
} from '../../src';
import { VideoContext } from '../../src/context/video';
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
	const { videoContextApi, setVideoContext } = usePlayerContext();

	const [videoDuration, setVideoDuration] = useDelayedState<number>(0);
	const [isPlaying, setIsPlaying] = useDelayedState(false);
	const [transcript, setTranscript] = useDelayedState<Transcript[]>([]);

	const videoContextRef = React.useRef<VideoContext>();
	const [currentPart, setCurrentPart] = useDelayedState<Transcript>({
		index: 0,
		end: 0,
		start: 0,
	});

	const getCurrentTimePart = React.useCallback(() => {
		const videoEl =
			videoContextRef?.current?.reactPlayerRef?.current?.getInternalPlayer();
		if (!videoEl) {
			return;
		}

		return findMatchingPartOrNext(transcript, videoEl.currentTime * 1000 - 1);
	}, [videoContextRef, transcript]);

	const onSeek = React.useCallback(() => {
		const curPart = getCurrentTimePart();
		if (curPart) {
			setCurrentPart(curPart, 1);
		}
	}, [getCurrentTimePart, setCurrentPart]);

	useVideoListener('play', () => setIsPlaying(true, 1), videoContextApi);
	useVideoListener('pause', () => setIsPlaying(false, 1), videoContextApi);
	useVideoListener('seeked', onSeek, videoContextApi);
	useVideoListener(
		'timeupdate',
		(e: TimeUpdateEvent) => {
			setVideoDuration(e.duration, 1);
			const res = findMatchingPartOrNext(transcript, e.seconds);
			setCurrentPart(res, 1);
		},
		videoContextApi,
	);
	// Create random timestamps due to video duration
	React.useEffect(() => {
		setTranscript(createTimestamps(videoDuration, args.secondsDivider));
	}, [videoDuration, args.secondsDivider]);

	return (
		<div>
			<VideoPlayer videoUrl={args.videoUrl} onContext={setVideoContext} />
			<Karaoke
				isPlaying={isPlaying}
				requestPip={videoContextRef.current?.api?.requestPip}
				setCurrentTime={videoContextRef.current?.api?.setCurrentTime}
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
