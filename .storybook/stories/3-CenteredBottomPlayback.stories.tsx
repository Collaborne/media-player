import { Meta, Story } from '@storybook/react';

import {
	CenteredBottomPlayback as CenteredBottomPlaybackComponent,
	CenteredBottomPlaybackProps,
} from '../../src/components/centered-bottom-playback/CenteredBottomPlayback';
import {
	withDemoCard,
	withPlayerTheme,
	withVideoProvider,
	withVideoWrapper,
} from '../decorators';

export const CenteredBottomPlayback: Story<
	CenteredBottomPlaybackProps
> = () => {
	return <CenteredBottomPlaybackComponent />;
};

export default {
	title: 'Video Player Controls',
	component: CenteredBottomPlayback,
	decorators: [
		withVideoProvider,
		withVideoWrapper,
		withDemoCard,
		withPlayerTheme,
	],
	args: {},
	argTypes: {},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
