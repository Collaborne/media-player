import { Meta, Story } from '@storybook/react';

import {
	DraggablePopover as DraggablePopoverComponent,
	DraggablePopoverProps,
} from '../../src/components/draggable-popover/DraggablePopover';
import {
	withDemoCard,
	withIntl,
	withPlayerTheme,
	withTheme,
	withVideoWrapper,
} from '../decorators';

export const DraggablePopover: Story<Partial<DraggablePopoverProps>> = args => {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column-reverse',
			}}
		>
			<DraggablePopoverComponent disablePortal={args.disablePortal}>
				<div style={{ background: 'red', width: '100%', height: '100%' }} />
			</DraggablePopoverComponent>
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: DraggablePopover,
	decorators: [
		withVideoWrapper,
		withDemoCard,
		withPlayerTheme,
		withTheme,
		withIntl,
	],
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
