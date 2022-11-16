import { Meta, Story } from '@storybook/react';

import {
	MediaPlayer as MediaPlayerComponent,
	MediaPlayerProps,
} from '../../src/components/media-player/MediaPlayer';
import { withDemoCard, withIntl } from '../decorators';

export const MediaPlayer: Story<MediaPlayerProps> = args => {
	return <MediaPlayerComponent {...args} />;
};

export default {
	title: 'Media Player',
	component: MediaPlayer,
	decorators: [withDemoCard, withIntl],
	args: {
		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		mediaType: undefined,
		xAxisDistance: 16,
		yAxisDistance: 16,
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
		mediaType: {
			name: 'props.mediaType',
			description:
				'Initial media type that will enforce to build corresponding UI ',
			table: {
				type: { summary: 'MediaType' },
				defaultValue: { summary: undefined },
			},
		},
		yAxisDistance: {
			name: 'props.yAxisDistance',
			description:
				'Distance from window border bottom, on Y axis in `pixels`, for PIP player position initialization ',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 16 },
			},
		},
		xAxisDistance: {
			name: 'props.xAxisDistance',
			description:
				'Distance from window border right, on X axis in `pixels`, for PIP player position initialization',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 16 },
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
