import { Meta, Story } from '@storybook/react';

import { withDemoCard, withTheme } from '../decorators';
import {
	VideoPlayer as VideoPlayerComponent,
	VideoPlayerProps,
} from '../../src/components/video-player';
import { DEFAULT_CONTROLS_CONFIG } from '../../src/components/controls/controls-config';

export const VideoPlayer: Story<VideoPlayerProps> = args => (
	<>
		<VideoPlayerComponent {...args} />
		<div
			style={{
				width: '100%',
				height: '500px',
				background: 'green',
				margin: '10px',
			}}
		/>
	</>
);

export default {
	title: 'Video Player',
	component: VideoPlayer,
	decorators: [withDemoCard, withTheme],
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
