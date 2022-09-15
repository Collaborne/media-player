import { StoryContext } from '@storybook/addons';
import * as React from 'react';

import { CorePlayer } from '../../src/components/core-player/CorePlayer';
import { PROVIDER_INITIAL_STATE } from '../../src/components/core-player/types';
import { useFilePlayerStyles } from '../../src/components/video-container/useVideoContainerStyles';

// TODO: When all dump components will be added to storybook,
// merge provider into with-video-wrapper decorator

export const withCorePlayer = (
	Story: React.FC<StoryContext>,
	context: StoryContext,
) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { wrapper } = useFilePlayerStyles().classes;

	return (
		<CorePlayer
			className={wrapper}
			videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
			initialState={{ ...PROVIDER_INITIAL_STATE }}
		>
			<Story {...context} />
		</CorePlayer>
	);
};
