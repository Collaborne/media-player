import { Meta, Story } from '@storybook/react';

import {
	DraggablePopover as DraggablePopoverComponent,
	DraggablePopoverProps,
} from '../../src/components/draggable-popover/DraggablePopover';
import { withCorePlayer, withDemoCard } from '../decorators';

export const DraggablePopover: Story<DraggablePopoverProps> = args => {
	return (
		<DraggablePopoverComponent {...args}>
			<div style={{ background: 'red', width: '100%', height: '100%' }} />
		</DraggablePopoverComponent>
	);
};

export default {
	title: 'Media Player Controls',
	component: DraggablePopover,
	decorators: [withCorePlayer, withDemoCard],
	args: {
		disablePortal: false,
		className: '',
		xAxisDistance: 16,
		yAxisDistance: 16,
	},
	argTypes: {
		disablePortal: {
			name: 'props.disablePortal',
			description: 'Moves React component into a *portal*',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
	},
	className: {
		name: 'props.className',
		description: 'Class name applied to div*wrapper of the component',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: undefined },
		},
		yAxisDistance: {
			name: 'props.yAxisDistance',
			description:
				'Distance from window border bottom, on Y axis in `pixels`, for PIP player position initialization ',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 16 },
			},
		},
		xAxisDistance: {
			name: 'props.xAxisDistance',
			description:
				'Distance from window border right, on X axis in `pixels`, for PIP player position initialization',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 16 },
			},
		},
	},

	parameters: {
		controls: { expanded: true },
	},
} as Meta;
