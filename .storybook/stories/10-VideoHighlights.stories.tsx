import React from 'react';
import { DEFAULT_CONTROLS_CONFIG } from '../../src/components/controls/controls-config';
import { VideoProvider } from '../../src/context/video';
import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';
import { VideoContainer } from '../../src/components/video-player/VideoContainer';
import { RandomHighlight } from '../components/random-highlight/RandomHighlight';
import { useFilePlayerStyles } from '../../src/components/video-player/useVideoContainerStyles';

export const VideoHighlights = () => {
	const { wrapper } = useFilePlayerStyles().classes;

	return (
		<VideoProvider controlsConfig={DEFAULT_CONTROLS_CONFIG}>
			<VideoContainer
				videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
				className={wrapper}
			/>
			<RandomHighlight />
		</VideoProvider>
	);
};

export default {
	title: 'Video Player Controls',
	component: VideoHighlights,
	decorators: [withDemoCard, withPlayerTheme],
};
