import React from 'react';

import { CenteredPlayButton as CenteredPlayButtonComponent } from '../../src/components/centered-play-button/CenteredPlayButton';
import { Controls } from '../../src/components/controls/Controls';
import { withCorePlayer, withDemoCard } from '../decorators';

export const CenteredPlayButton: React.FC = () => {
	return (
		<Controls>
			<CenteredPlayButtonComponent />
		</Controls>
	);
};

export default {
	title: 'Video Player Controls',
	component: CenteredPlayButton,
	decorators: [withCorePlayer, withDemoCard],
	parameters: {
		controls: { expanded: true },
	},
};
