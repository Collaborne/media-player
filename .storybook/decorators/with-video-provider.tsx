import { StoryContext } from '@storybook/addons';
import { FC } from 'react';

import { DEFAULT_CONTROLS_CONFIG } from '../../src/components/controls/controls-config';
import { VideoProvider } from '../../src/context/video';

// TODO: When all dump components will be added to storybook,
// merge provider into with-video-wrapper decorator

export const withVideoProvider = (
	Story: FC<StoryContext>,
	context: StoryContext,
) => {
	return (
		<VideoProvider controlsConfig={DEFAULT_CONTROLS_CONFIG}>
			<Story {...context} />
		</VideoProvider>
	);
};
