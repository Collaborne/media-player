import React from 'react';

import {
	EventProgressBar as EventProgressBarComponent,
	MediaPlayer,
	usePlayerContext,
} from '../../src';

import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';

interface EventProgressBarProps {
	url: string;
}

export const EventProgressBar: React.FC<EventProgressBarProps> = args => {
	const { mediaContext, setMediaContext } = usePlayerContext();
	return (
		<div>
			<MediaPlayer url={args.url} onStoreUpdate={setMediaContext} />
			<EventProgressBarComponent mediaListener={mediaContext?.getListener()} />
		</div>
	);
};

export default {
	title: 'Media Player Controls',
	component: EventProgressBar,
	decorators: [withDemoCard, withPlayerTheme],
	args: {
		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
	},
	argTypes: {
		url: {
			name: 'url',
			description: 'A media URL. Only file type supported',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: undefined },
			},
		},
	},
};
