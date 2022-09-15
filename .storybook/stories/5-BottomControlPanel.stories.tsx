import { Meta, Story } from '@storybook/react';

import {
	BottomControlButtons as BottomControlButtonsComponent,
	BottomControlButtonsProps,
} from '../../src/components/bottom-control-panel/BottomControlButtons';
import {
	withDemoCard,
	withPlayerTheme,
	withVideoProvider,
	withVideoWrapper,
} from '../decorators';

import {
	bottomControlPanelStoryArgTypes,
	bottomControlPanelStoryArgs,
} from './shared/bottom-control-panel.args';

export const BottomControlButtons: Story<
	Partial<BottomControlButtonsProps>
> = () => {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column-reverse',
			}}
		>
			<BottomControlButtonsComponent />
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: BottomControlButtons,
	decorators: [
		withVideoProvider,
		withVideoWrapper,
		withDemoCard,
		withPlayerTheme,
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
