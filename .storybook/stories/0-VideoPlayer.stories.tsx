import { Meta, Story } from '@storybook/react';

import { withDemoCard, withTheme } from '../decorators';
import {
	VideoPlayer as VideoPlayerComponent,
	VideoPlayerProps,
} from '../../src/components/video-player';

export const VideoPlayer: Story<VideoPlayerProps> = args => (
	<VideoPlayerComponent {...args} />
);

export default {
	title: 'Video Player',
	component: VideoPlayer,
	decorators: [withDemoCard, withTheme],
	args: {
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
