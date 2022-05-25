import { StoryContext } from '@storybook/addons';

import { VideoProvider } from '../../src/context/video';

import { DEFAULT_CONTROLS_CONFIG } from '../../src/components/controls/controls-config';

// TODO: When all dump components will be added to storybook,
// merge provider into with-video-wrapper decorator

export const withVideoProvider = (Story: any, context: StoryContext) => {
	return (
		<VideoProvider controlsConfig={DEFAULT_CONTROLS_CONFIG}>
			<Story {...context} />
		</VideoProvider>
	);
};
