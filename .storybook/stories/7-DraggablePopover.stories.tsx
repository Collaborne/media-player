import { Meta, Story } from '@storybook/react';

import {
	DraggablePopover as DraggablePopoverComponent,
	DraggablePopoverProps,
} from '../../src/components/draggable-popover/DraggablePopover';
import { withCorePlayer, withDemoCard } from '../decorators';

export const DraggablePopover: Story<Partial<DraggablePopoverProps>> = args => {
	return (
		<DraggablePopoverComponent disablePortal={args.disablePortal}>
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
	},

	parameters: {
		controls: { expanded: true },
	},
} as Meta;
