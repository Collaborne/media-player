import { Meta, Story } from '@storybook/react';

import { withDemoCard, withIntl, withTheme } from '../decorators';

import {
	VideoPlayer as VideoPlayerComponent,
	VideoPlayerProps,
} from '../../src/components/video-player';
import { DEFAULT_CONTROLS_CONFIG } from '../../src/components/controls/controls-config';
import { useFilePlayerStyles } from '../../src/components/video-player/useVideoContainerStyles';

// Add width and height that is used for FileCard

export const VideoPlayer: Story<VideoPlayerProps> = args => {
	const { wrapper } = useFilePlayerStyles();
	return (
		<>
			<VideoPlayerComponent {...args} className={wrapper} />
			<br />
			<VideoPlayerComponent
				{...args}
				videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
				className={wrapper}
			/>
			<br />
			<VideoPlayerComponent
				{...args}
				videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
				className={wrapper}
			/>
			<br />
			<VideoPlayerComponent
				{...args}
				videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
				className={wrapper}
			/>
		</>
	);
};

export default {
	title: 'Video Player',
	component: VideoPlayer,
	decorators: [withDemoCard, withTheme, withIntl],
	args: {
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		controlsConfig: DEFAULT_CONTROLS_CONFIG,
	},
	argTypes: {
		videoUrl: {
			name: 'props.videoUrl',
			description: 'A video URL. Any ReactPlayer type supported',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: undefined },
			},
		},
		controlsConfig: {
			name: 'props.controlsConfig',
			description:
				'An object that controls presence in player of one or another control.',
			table: {
				type: { summary: 'ControlsConfig' },
				defaultValue: { summary: DEFAULT_CONTROLS_CONFIG },
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
