import { Meta, Story } from '@storybook/react';

import {
	withDemoCard,
	withTheme,
	withVideoProvider,
	withVideoWrapper,
} from '../decorators';
import {
	CenteredBottomPlayback as CenteredBottomPlaybackComponent,
	CenteredBottomPlaybackProps,
} from '../../src/components/centered-bottom-playback/CenteredBottomPlayback';

export const CenteredBottomPlayback: Story<
	CenteredBottomPlaybackProps
> = () => {
	return <CenteredBottomPlaybackComponent />;
};

export default {
	title: 'Video Player Controls',
	component: CenteredBottomPlayback,
	decorators: [withVideoProvider, withVideoWrapper, withDemoCard, withTheme],
	args: {},
	argTypes: {},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
