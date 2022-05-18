import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';
import {
	CenteredBottomPlayback as CenteredBottomPlaybackComponent,
	CenteredBottomPlaybackProps,
} from '../../src/components/centered-bottom-playback/CenteredBottomPlayback';
import { PLAYBACK_RATES } from '../../src/utils/constants';

export const CenteredBottomPlayback: Story<
	CenteredBottomPlaybackProps
> = args => {
	return (
		<CenteredBottomPlaybackComponent
			onChangePlaybackRate={action('playBackRate')}
			activePlaybackRate={args.activePlaybackRate}
		/>
	);
};

export default {
	title: 'Video Player Controls',
	component: CenteredBottomPlayback,
	decorators: [withVideoWrapper, withDemoCard, withTheme],
	args: {
		activePlaybackRate: 1.5,
	},
	argTypes: {
		activePlaybackRate: {
			name: 'props.activePlaybackRate',
			description: 'Video playing speed ',
			control: { type: 'select', options: PLAYBACK_RATES },

			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 1 },
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
