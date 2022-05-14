import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';
import { CenteredBottomPlayback as CenteredBottomPlaybackComponent } from '../../src/components/centered-bottom-playback/centered-bottom-playback.component';

export const CenteredBottomPlayback = () => {
	return <CenteredBottomPlaybackComponent activePlaybackRate={1} />;
};

export default {
	title: 'Video Player Controls',
	component: CenteredBottomPlayback,
	decorators: [withKnobs, withVideoWrapper, withDemoCard, withTheme],
};
