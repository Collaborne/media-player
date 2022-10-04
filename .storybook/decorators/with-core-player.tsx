import { StoryContext } from '@storybook/addons';
import * as React from 'react';

import { CorePlayer } from '../../src/components/core-player/CorePlayer';
import { PROVIDER_INITIAL_STATE } from '../../src/components/core-player/types';

// TODO: When all dump components will be added to storybook,
// merge provider into with-video-wrapper decorator

export const withCorePlayer = (
	Story: React.FC<StoryContext>,
	context: StoryContext,
) => {
	return (
		<CorePlayer
			videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
			initialState={{ ...PROVIDER_INITIAL_STATE }}
		>
			<Story {...context} />
		</CorePlayer>
	);
};
