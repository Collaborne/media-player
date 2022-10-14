import { Meta, Story } from '@storybook/react';

import {
	MediaPlayer as MediaPlayerComponent,
	MediaPlayerProps,
} from '../../src/components/media-player/MediaPlayer';
import { withDemoCard, withIntl } from '../decorators';

export const MediaPlayer: Story<MediaPlayerProps> = args => {
	return (
		<>
			<MediaPlayerComponent {...args} />
			<div style={{ height: '2000px' }} />
		</>
	);
};

export default {
	title: 'Media Player',
	component: MediaPlayer,
	decorators: [withDemoCard, withIntl],
	args: {
		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
	},
	argTypes: {
		url: {
			name: 'props.url',
			description: 'A media URL. Only file type supported',
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
