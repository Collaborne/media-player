import { StoryFn } from '@storybook/react';

import { BottomControls } from '../../src/components/bottom-controls/BottomControls.js';
import { Controls } from '../../src/components/controls/Controls.js';
import { ProgressBar as ProgressBarComponent } from '../../src/components/progress-bar/ProgressBar.js';
import { withCorePlayer, withDemoCard } from '../decorators/index.js';

interface ProgressBarStoryProps {
	hideAllControls: boolean;
}

export const ProgressBar: StoryFn<ProgressBarStoryProps> = () => {
	return (
		<Controls>
			<BottomControls>
				<ProgressBarComponent />
			</BottomControls>
		</Controls>
	);
};

export default {
	title: 'Media Player Controls',
	component: ProgressBar,
	decorators: [withCorePlayer, withDemoCard],
	args: {},
	argTypes: {},
	parameters: {
		controls: { expanded: true },
	},
};
