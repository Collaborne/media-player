import React from 'react';
import { uuid } from 'uuidv4';

import {
	EventBasedProgressBar as EventBasedProgressBarComponent,
	Highlight,
	MediaPlayer,
	usePlayerContext,
} from '../../src';
import { RandomHighlight } from '../components/random-highlight/RandomHighlight';
import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';
import { highlightColors, pickRandomItem } from '../utils/highlights';

interface EventBasedProgressBarProps {
	url: string;
}

export const EventBasedProgressBar: React.FC<
	EventBasedProgressBarProps
> = args => {
	const { mediaContext, setMediaContext } = usePlayerContext();
	const [highlights, setHighlights] = React.useState<Highlight[]>([]);
	const duration = mediaContext?.duration;

	const end = Math.random() * (duration || 0);
	const start = Math.random() * end;
	const addHighlightToStart = () => {
		setHighlights(prev => [
			...prev,
			{
				start,
				end,
				colors: [
					pickRandomItem(highlightColors),
					pickRandomItem(highlightColors),
					pickRandomItem(highlightColors),
				],
				id: uuid(),
			},
		]);
	};
	return (
		<>
			<MediaPlayer
				url={args.url}
				onStoreUpdate={setMediaContext}
				highlights={highlights}
			/>
			<EventBasedProgressBarComponent
				mediaListener={mediaContext?.getListener()}
				setCurrentTime={mediaContext?.setCurrentTime}
				highlights={highlights}
			/>
			<RandomHighlight
				addHighlightToStart={addHighlightToStart}
				highlights={highlights}
			/>
		</>
	);
};

export default {
	title: 'Media Player Controls',
	component: EventBasedProgressBar,
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
