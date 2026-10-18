import React from 'react';

import { CenteredPlayButton as CenteredPlayButtonComponent } from '../../src/components/centered-play-button/CenteredPlayButton.js';
import { Controls } from '../../src/components/controls/Controls.js';
import { withCorePlayer, withDemoCard } from '../decorators/index.js';

export const CenteredPlayButton: React.FC = () => {
	return (
		<Controls>
			<CenteredPlayButtonComponent />
		</Controls>
	);
};

export default {
	title: 'Media Player Controls',
	component: CenteredPlayButton,
	decorators: [withCorePlayer, withDemoCard],
	parameters: {
		controls: { expanded: true },
	},
};
