import { Meta, Story } from '@storybook/react';

import {
	MediaPlayer as MediaPlayerComponent,
	MediaPlayerProps,
} from '../../src/components/media-player/MediaPlayer';
import { withDemoCard, withIntl } from '../decorators';

export const AudioPlayer: Story<MediaPlayerProps> = args => {
	return <MediaPlayerComponent {...args} />;
};

export default {
	title: 'Audio Player',
	component: AudioPlayer,
	decorators: [withDemoCard, withIntl],
	args: {
		url: `https://assets.mixkit.co/sfx/preview/mixkit-game-show-suspense-waiting-667.mp3`,
		audioPlaceholder: undefined,
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
		audioPlaceholder: {
			name: 'props.audioPlaceholder',
			description:
				'URL to a image to be a placeholder for audio files in PIP mode',
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
