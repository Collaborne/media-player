import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { CenteredPlayButton as CenteredPlayButtonComponent } from '../../src/components/centered-play-button/centered-play-button.component';
import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';

export const CenteredPlayButton = () => {
	return <CenteredPlayButtonComponent />;
};

export default {
	title: 'Video Player Controls',
	component: CenteredPlayButton,
	decorators: [withKnobs, withVideoWrapper, withDemoCard, withTheme],
};
