import React from 'react';

import { Highlight, MediaPlayer, usePlayerContext } from '../../src';
import { RandomHighlight } from '../components/random-highlight/RandomHighlight';
import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';
import { createRandomId } from '../utils/create-random-id';
import { highlightColors, pickRandomItem } from '../utils/highlights';

export const MediaHighlights = () => {
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
				onStoreUpdate={setMediaContext}
				highlights={highlights}
				url="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
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
	component: MediaHighlights,
	decorators: [withDemoCard, withPlayerTheme],
};
