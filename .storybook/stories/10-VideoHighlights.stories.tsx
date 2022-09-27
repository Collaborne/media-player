import React from 'react';
import { uuid } from 'uuidv4';

import {
	Highlight,
	useDelayedState,
	usePlayerContext,
	useVideoListener,
	VideoPlayer,
} from '../../src';
import { useFilePlayerStyles } from '../../src/components/video-container/useVideoContainerStyles';
import { RandomHighlight } from '../components/random-highlight/RandomHighlight';
import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';
import { highlightColors, pickRandomItem } from '../utils/highlights';

export const VideoHighlights = () => {
	const { videoContextApi, setVideoContext } = usePlayerContext();
	const { wrapper } = useFilePlayerStyles().classes;
	const [highlights, setHighlights] = React.useState<Highlight[]>([]);
	const [videoDuration, setVideoDuration] = useDelayedState(0);

	useVideoListener(
		'durationchange',
		({ duration }) => setVideoDuration(duration, 1),
		videoContextApi,
	);

	const end = Math.random() * videoDuration;
	const start = Math.random() * end;
	const addHighlightToStart = () => {
		setHighlights(prev => [
			...prev,
			{
				start,
				end,
				colors: [
					pickRandomItem(highlightColors),
					pickRandomItem(highlightColors),
					pickRandomItem(highlightColors),
				],
				id: uuid(),
			},
		]);
	};
	return (
		<>
			<VideoPlayer
				onContext={setVideoContext}
				highlights={highlights}
				videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
				className={wrapper}
			/>
			<RandomHighlight
				addHighlightToStart={addHighlightToStart}
				highlights={highlights}
			/>
		</>
	);
};

export default {
	title: 'Video Player Controls',
	component: VideoHighlights,
	decorators: [withDemoCard, withPlayerTheme],
};
