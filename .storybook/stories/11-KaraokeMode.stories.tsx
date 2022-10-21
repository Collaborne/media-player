import React, { useCallback } from 'react';
import { usePreviousDistinct } from 'react-use';

import {
	TimeUpdateEvent,
	useDelayedState,
	useMediaListener,
	MediaPlayer,
	usePlayerContext,
} from '../../src';
import { toTwoDigits } from '../../src/utils';
import { Timestamp } from '../components/karaoke/Timestamp';
import { createTimestamps } from '../components/karaoke/utils';
import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';

import { findMatchingPartOrNext, Transcript } from './shared/transcript';

interface KaraokeModeProps {
	secondsDivider: number;
	url: string;
}

type TranscriptRef = { ref: HTMLButtonElement | null };

export const KaraokeMode: React.FC<KaraokeModeProps> = args => {
	const [isTimestampsReady, setIsTimestampsReady] = useDelayedState(false);
	const transcriptsElementRef = React.useRef<TranscriptRef[]>([]);
	const alarmRef = React.useRef<number[]>([]);
	const setTranscriptsElementRef = (ref: HTMLButtonElement | null) =>
		transcriptsElementRef.current.push({ ref });
	const { setMediaContext, mediaContext } = usePlayerContext();
	const ready = mediaContext?.ready;
	const mediaDuration = mediaContext?.duration || 0;
	const transcriptRef = React.useRef<Transcript[]>([]);
	const listener = mediaContext?.getListener();
	const setCurrentTime = mediaContext?.setCurrentTime;
	const [currentPart, setCurrentPart] = useDelayedState<Transcript>({
		index: 0,
		end: 0,
		start: 0,
	});

	const getCurrentTimePart = React.useCallback(() => {
		const mediaEl = mediaContext?.reactPlayerRef?.current?.getInternalPlayer();
		if (!mediaEl) {
			return;
		}

		return findMatchingPartOrNext(
			transcriptRef.current,
			mediaEl.currentTime * 1000 - 1,
		);
	}, [mediaContext]);

	const onSeek = React.useCallback(() => {
		const curPart = getCurrentTimePart();
		if (curPart) {
			setCurrentPart(curPart, 1);
		}
	}, [getCurrentTimePart, setCurrentPart]);

	useMediaListener('seeked', onSeek, listener);

	useMediaListener(
		'onTimeAlarm',
		(e: TimeUpdateEvent) => {
			const res = findMatchingPartOrNext(transcriptRef.current, e.seconds);
			setCurrentPart(res, 1);
		},
		listener,
	);

	// create alarms from transcript
	const createAlarms = React.useCallback(() => {
		for (let sec = 0; sec < mediaDuration; sec++) {
			for (
				let secMultiplier = 0;
				secMultiplier < args.secondsDivider;
				secMultiplier++
			) {
				const secondDigits =
					secMultiplier === 0 ? 0 : (1 / args.secondsDivider) * secMultiplier;
				alarmRef.current.push(toTwoDigits(sec + secondDigits));
			}
		}
	}, [mediaDuration, args.secondsDivider]);
	// Create random timestamps due to media duration
	React.useEffect(() => {
		transcriptRef.current = createTimestamps(
			mediaDuration,
			args.secondsDivider,
		);
		createAlarms();
		if (transcriptRef.current && alarmRef.current) {
			setIsTimestampsReady(true, 3000);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediaDuration, args.secondsDivider, ready]);

	const timeStampsMemo = React.useMemo(() => {
		if (ready && isTimestampsReady && transcriptRef.current.length > 0) {
			return transcriptRef.current.map(({ start, end, index }) => {
				return (
					<Timestamp
						ref={setTranscriptsElementRef}
						onClick={() => setCurrentTime?.(start)}
						key={index}
						isActive={false}
					>
						{`[${start} - ${end}]`}
					</Timestamp>
				);
			});
		}
		return null;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ready, isTimestampsReady, transcriptRef]);
	const prevCurrent = usePreviousDistinct(currentPart);
	const createActiveSpan = useCallback(() => {
		const element = transcriptsElementRef.current[currentPart.index];
		if (element && element.ref) {
			element.ref.style.background = 'red';
		}
		if (prevCurrent) {
			const element = transcriptsElementRef.current[prevCurrent.index];
			if (element && element.ref) {
				element.ref.style.background = '';
			}
		}
		return null;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPart, timeStampsMemo]);

	return (
		<div>
			<MediaPlayer
				url={args.url}
				onStoreUpdate={setMediaContext}
				alarms={alarmRef.current}
			/>
			<div>{timeStampsMemo}</div>
			{createActiveSpan()}
		</div>
	);
};

export default {
	title: 'Karaoke Mode',
	component: KaraokeMode,
	decorators: [withDemoCard, withPlayerTheme],
	args: {
		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		secondsDivider: 2,
	},
	argTypes: {
		url: {
			name: 'url',
			description: 'A media URL. Only file type supported',
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
