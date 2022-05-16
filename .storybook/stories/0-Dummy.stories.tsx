import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import ReactPlayer from 'react-player';

const Dummy = () => (
	<ReactPlayer
		controls
		url="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
	/>
);

export default {
	title: 'Standard Player',
	component: Dummy,
	decorators: [withKnobs],
};

export const StandardBrowserFunctionality = () => {
	return <Dummy />;
};
