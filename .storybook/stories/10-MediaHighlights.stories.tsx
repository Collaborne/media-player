import React from 'react';
import { uuid } from 'uuidv4';

import { Highlight, MediaPlayer, usePlayerContext } from '../../src';
import { RandomHighlight } from '../components/random-highlight/RandomHighlight';
import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';
import { highlightColors, pickRandomItem } from '../utils/highlights';

export const MediaHighlights = () => {
	const { mediaStore, onMediaStore } = usePlayerContext();
	const [highlights, setHighlights] = React.useState<Highlight[]>([]);
	const duration = mediaStore?.duration;

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

	console.log('=>rerender');
	return (
		<>
			<MediaPlayer
				onStoreUpdate={onMediaStore}
				highlights={highlights}
				url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
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
