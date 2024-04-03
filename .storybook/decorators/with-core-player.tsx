import type { StoryContext } from '@storybook/types';
import * as React from 'react';

import { CorePlayer } from '../../src/components/core-player/CorePlayer';
import { CORE_PLAYER_INITIAL_STATE } from '../../src/components/core-player/types';

// TODO: When all dump components will be added to storybook,
// merge provider into with-media-wrapper decorator

export const withCorePlayer = (
	Story: React.FC<StoryContext>,
	context: StoryContext,
) => {
	return (
		<CorePlayer
			url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
			initialState={{ ...CORE_PLAYER_INITIAL_STATE }}
		>
			<Story {...context} />
		</CorePlayer>
	);
};
