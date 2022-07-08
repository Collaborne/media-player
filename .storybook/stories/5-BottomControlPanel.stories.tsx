import { Meta, Story } from '@storybook/react';

import {
	BottomControlPanel as BottomControlPanelComponent,
	BottomControlPanelProps,
} from '../../src/components/bottom-control-panel/BottomControlPanel';
import {
	withDemoCard,
	withPlayerTheme,
	withTheme,
	withVideoProvider,
	withVideoWrapper,
} from '../decorators';

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
	decorators: [
		withVideoProvider,
		withVideoWrapper,
		withDemoCard,
		withPlayerTheme,
		withTheme,
	],
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
