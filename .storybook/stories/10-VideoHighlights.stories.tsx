import React from 'react';
import { uuid } from 'uuidv4';

import { Highlight, VideoPlayer } from '../../src';
import { DEFAULT_CONTROLS_CONFIG } from '../../src/components/controls/controls-config';
import { useFilePlayerStyles } from '../../src/components/video-player/useVideoContainerStyles';
import { VideoContext } from '../../src/context/video';
import {
	highlightColors,
	pickRandomItem,
	RandomHighlight,
} from '../components/random-highlight/RandomHighlight';
import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';

export const VideoHighlights = () => {
	const { wrapper } = useFilePlayerStyles().classes;

	const [highlights, setHighlights] = React.useState<Highlight[]>([]);
	const videoContextRef = React.useRef<VideoContext>();

	const setVideoContext = React.useCallback((context: VideoContext) => {
		videoContextRef.current = context;
	}, []);
	const maximumSecondsForHighlights = 600;
	const end = Math.random() * maximumSecondsForHighlights;
	const start = Math.random() * end;

	const addHighlightToStart = () =>
		setHighlights(prev => [
			...prev,
			{
				start,
				end,
				color: pickRandomItem(highlightColors),
				id: uuid(),
			},
		]);

	return (
		<>
			<VideoPlayer
				highlights={highlights}
				onContext={setVideoContext}
				controlsConfig={DEFAULT_CONTROLS_CONFIG}
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
