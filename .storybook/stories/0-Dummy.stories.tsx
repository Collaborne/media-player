import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

// TODO: Remove this story

function Dummy(): JSX.Element {
	return (
		<div>
			This is a placeholder for the real stories of this component.
		</div>
	);
}

export default {
	title: 'Dummy',
	component: Dummy,
	decorators: [withKnobs],
};

export const Introduction = () => {
	return <Dummy/>;
}
