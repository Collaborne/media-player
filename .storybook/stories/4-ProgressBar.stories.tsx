import { Story } from '@storybook/react';

import { BottomControls } from '../../src/components/bottom-controls/BottomControls';
import { Controls } from '../../src/components/controls/Controls';
import { ProgressBar as ProgressBarComponent } from '../../src/components/progress-bar/ProgressBar';
import { withCorePlayer, withDemoCard } from '../decorators';

interface ProgressBarStoryProps {
	hideAllControls: boolean;
}

export const ProgressBar: Story<ProgressBarStoryProps> = args => {
	return (
		<Controls hideAllControls={args.hideAllControls}>
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
	args: {
		hideAllControls: false,
	},
	argTypes: {
		hideAllControls: {
			name: 'hideAllControls',
			description:
				'In `<MediaPlayer />` - we always display a `<ProgressBar/>`(all controls can be hidden, except `<ProgressBar />`) This boolean will enforce do not to display all UI Controls(if it is the case)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
};
