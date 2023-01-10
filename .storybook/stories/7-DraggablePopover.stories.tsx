import Grid from '@mui/material/Grid/Grid';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import shallow from 'zustand/shallow';

import { DraggablePopoverProps } from '../../src/components/draggable-popover/DraggablePopover';
import { useMediaStore } from '../../src/context';
import { withCorePlayer, withDemoCard } from '../decorators';

export const DraggablePopover: Story<
	DraggablePopoverProps & { isPip: boolean }
> = args => {
	const [requestPip, exitPip] = useMediaStore(
		state => [state.requestPip, state.exitPip],
		shallow,
	);

	React.useEffect(() => {
		if (args.isPip) {
			requestPip();
			return;
		}
		exitPip();
	}, [args.isPip, exitPip, requestPip]);

	return <Grid />;
};

export default {
	title: 'Media Player Controls',
	component: DraggablePopover,
	decorators: [withCorePlayer, withDemoCard],
	args: {
		isPip: false,
		className: '',
		xAxisDistance: 16,
		yAxisDistance: 16,
	},
	argTypes: {
		isPip: {
			name: 'isPip',
			description: 'is Pip mode on',
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
