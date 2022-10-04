import { Meta, Story } from '@storybook/react';

import {
	VideoPlayer as VideoPlayerComponent,
	VideoPlayerProps,
} from '../../src/components/video-player/VideoPlayer';
import { withDemoCard, withIntl } from '../decorators';

export const VideoPlayer: Story<VideoPlayerProps> = args => {
	return <VideoPlayerComponent {...args} />;
};

export default {
	title: 'Video Player',
	component: VideoPlayer,
	decorators: [withDemoCard, withIntl],
	args: {
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
	},
	argTypes: {
		videoUrl: {
			name: 'props.videoUrl',
			description: 'A video URL. Only file type supported',
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
