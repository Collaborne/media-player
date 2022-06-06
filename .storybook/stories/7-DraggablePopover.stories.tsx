import { Meta, Story } from '@storybook/react';

import {
	withDemoCard,
	withTheme,
	withVideoWrapper,
	withIntl,
} from '../decorators';

import {
	DraggablePopover as DraggablePopoverComponent,
	DraggablePopoverProps,
} from '../../src/components/draggable-popover/DraggablePopover';

export const DraggablePopover: Story<Partial<DraggablePopoverProps>> = args => {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column-reverse',
			}}
		>
			<DraggablePopoverComponent open={args.open}>
				<div style={{ background: 'red', width: '100%', height: '100%' }} />
			</DraggablePopoverComponent>
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: DraggablePopover,
	decorators: [withVideoWrapper, withDemoCard, withTheme, withIntl],
	args: {
		open: false,
		className: '',
	},
	argTypes: {
		open: {
			name: 'props.open',
			description: 'Popover open status',
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
