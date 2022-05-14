import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { withTheme, withDemoCard, withVideoWrapper } from '../decorators';

const AllPlayerControls = () => {
	return (
		<div>
			<h1>Video Player Controls Story</h1>
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: AllPlayerControls,
	decorators: [withKnobs, withVideoWrapper, withDemoCard, withTheme],
};

export const AllControls = () => {
	return <AllPlayerControls />;
};
