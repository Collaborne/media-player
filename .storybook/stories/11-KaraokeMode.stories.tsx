import { duration } from '@mui/material';
import { useEffect } from '@storybook/addons';
import React, { RefObject, useCallback } from 'react';
import { usePreviousDistinct } from 'react-use';

import {
	TimeUpdateEvent,
	useDelayedState,
	useMediaListener,
	MediaPlayer,
	usePlayerContext,
} from '../../src';
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
	const setTranscriptsElementRef = (ref: HTMLButtonElement | null) =>
		transcriptsElementRef.current.push({ ref });
	const dateNow = React.useRef(Date.now());
	const { onMediaStore, mediaStore } = usePlayerContext();
	const ready = mediaStore?.ready;
	const currentTime = mediaStore?.currentTime;
	const mediaDuration = mediaStore?.duration || 0;
	const isPlaying = mediaStore?.playing;
	const transcriptRef = React.useRef<Transcript[]>([]);
	const listener = mediaStore?.getListener();
	const setCurrentTime = mediaStore?.setCurrentTime;
	const [currentPart, setCurrentPart] = useDelayedState<Transcript>({
		index: 0,
		end: 0,
		start: 0,
	});

	const getCurrentTimePart = React.useCallback(() => {
		const mediaEl = mediaStore?.reactPlayerRef?.current?.getInternalPlayer();
		if (!mediaEl) {
			return;
		}

		return findMatchingPartOrNext(
			transcriptRef.current,
			mediaEl.currentTime * 1000 - 1,
		);
	}, [mediaStore]);

	const onSeek = React.useCallback(() => {
		const curPart = getCurrentTimePart();
		if (curPart) {
			setCurrentPart(curPart, 1);
		}
	}, [getCurrentTimePart, setCurrentPart]);

	useMediaListener('seeked', onSeek, listener);

	useMediaListener(
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

			console.time('=====SEARCH  MyTimer');
			console.timeLog('=====SEARCH  MyTimer', 'Starting search');
			const res = findMatchingPartOrNext(transcriptRef.current, e.seconds);
			console.log('=====SEARCH time searched', Date.now() - dateNow.current);
			console.timeEnd('=====SEARCH  MyTimer');
			setCurrentPart(res, 1);
		},
		listener,
	);
	// Create random timestamps due to media duration
	React.useEffect(() => {
		transcriptRef.current = createTimestamps(
			mediaDuration,
			args.secondsDivider,
		);
		if (transcriptRef.current) {
			setIsTimestampsReady(true, 1000);
		}
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
	}, [currentPart, timeStampsMemo]);
	return (
		<div>
			<MediaPlayer url={args.url} onStoreUpdate={onMediaStore} />
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
		url: 'http://commondatastorage.googleapis.com/gtv-medias-bucket/sample/ElephantsDream.mp4',
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
