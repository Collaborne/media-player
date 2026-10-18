import React from 'react';

import {
	EventBasedProgressBar as EventBasedProgressBarComponent,
	Highlight,
	MediaPlayer,
	usePlayerContext,
} from '../../src/index.js';
import { RandomHighlight } from '../components/random-highlight/RandomHighlight.js';
import { withDemoCard } from '../decorators/index.js';
import { withPlayerTheme } from '../decorators/with-player-theme.js';
import { createRandomId } from '../utils/create-random-id.js';
import { highlightColors, pickRandomItem } from '../utils/highlights.js';

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
				id: createRandomId(),
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
		url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
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
