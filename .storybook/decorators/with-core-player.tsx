import type { StoryContext } from '@storybook/react';
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
			url="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
			initialState={{ ...CORE_PLAYER_INITIAL_STATE }}
		>
			<Story {...context} />
		</CorePlayer>
	);
};
