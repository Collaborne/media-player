import useEventListener from '@use-it/event-listener';
import React from 'react';

import { ExtendedTimeUpdateEvent, VideoPlayer } from '../../src';
import { DEFAULT_CONTROLS_CONFIG } from '../../src/components/controls/controls-config';
import { useFilePlayerStyles } from '../../src/components/video-player/useVideoContainerStyles';
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
	const { wrapper } = useFilePlayerStyles().classes;

	const [videoDuration, setVideoDuration] = React.useState<number>(0);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [transcript, setTranscript] = React.useState<Transcript[]>([]);

	const videoContextRef = React.useRef<VideoContext>();
	const videoContextApi = videoContextRef.current?.api;
	const [currentPart, setCurrentPart] = React.useState<Transcript>({
		index: 0,
		end: 0,
		start: 0,
	});
	const setVideoContext = React.useCallback(
		(context: VideoContext) => {
			videoContextRef.current = context;
		},
		[videoContextRef],
	);

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
			setCurrentPart(curPart);
		}
	}, [getCurrentTimePart, setCurrentPart]);

	useEventListener(
		'play',
		() => setIsPlaying(true),
		videoContextApi as unknown as HTMLElement,
	);
	useEventListener(
		'pause',
		() => setIsPlaying(false),
		videoContextApi as unknown as HTMLElement,
	);
	useEventListener('seeked', onSeek, videoContextApi as unknown as HTMLElement);

	const handleTimeUpdate = (event: ExtendedTimeUpdateEvent) => {
		const res = findMatchingPartOrNext(transcript, event.seconds);
		setCurrentPart(res);
	};

	// Wait to mount 1sec and then depending on video duration populate with transcripts
	React.useEffect(() => {
		setTimeout(() => {
			if (videoContextRef.current?.api?.getDuration) {
				setVideoDuration(videoContextRef.current?.api?.getDuration?.());
			}
		}, 1000);
	}, []);

	React.useEffect(() => {
		setTranscript(createTimestamps(videoDuration, args.secondsDivider));
	}, [videoDuration, args.secondsDivider]);

	return (
		<div>
			<VideoPlayer
				videoUrl={args.videoUrl}
				controlsConfig={{ ...DEFAULT_CONTROLS_CONFIG, fileActionsPanel: false }}
				className={wrapper}
				onContext={setVideoContext}
				onTimeUpdate={handleTimeUpdate}
			/>
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
