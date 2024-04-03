import { StoryFn } from '@storybook/react';

import { BottomControls } from '../../src/components/bottom-controls/BottomControls';
import { Controls } from '../../src/components/controls/Controls';
import { ProgressBar as ProgressBarComponent } from '../../src/components/progress-bar/ProgressBar';
import { withCorePlayer, withDemoCard } from '../decorators';

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
