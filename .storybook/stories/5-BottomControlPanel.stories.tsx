import { Meta, Story } from '@storybook/react';

import {
	withDemoCard,
	withTheme,
	withVideoProvider,
	withVideoWrapper,
} from '../decorators';
import {
	BottomControlPanel as BottomControlPanelComponent,
	BottomControlPanelProps,
} from '../../src/components/bottom-control-panel/BottomControlPanel';

import {
	bottomControlPanelStoryArgTypes,
	bottomControlPanelStoryArgs,
} from './shared/bottom-control-panel.args';

export const BottomControlPanel: Story<
	Partial<BottomControlPanelProps>
> = () => {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column-reverse',
			}}
		>
			<BottomControlPanelComponent />
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: BottomControlPanel,
	decorators: [withVideoProvider, withVideoWrapper, withDemoCard, withTheme],
	args: {
		...bottomControlPanelStoryArgs,
	},
	argTypes: {
		...bottomControlPanelStoryArgTypes,
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;