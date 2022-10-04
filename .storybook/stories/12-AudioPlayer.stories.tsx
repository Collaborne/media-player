import { Meta, Story } from '@storybook/react';

import {
	VideoPlayer as VideoPlayerComponent,
	VideoPlayerProps,
} from '../../src/components/video-player/VideoPlayer';
import { withDemoCard, withIntl } from '../decorators';

export const AudioPlayer: Story<VideoPlayerProps> = args => {
	return <VideoPlayerComponent {...args} />;
};

export default {
	title: 'Audio Player',
	component: AudioPlayer,
	decorators: [withDemoCard, withIntl],
	args: {
		videoUrl: `https://assets.mixkit.co/sfx/preview/mixkit-game-show-suspense-waiting-667.mp3`,
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
