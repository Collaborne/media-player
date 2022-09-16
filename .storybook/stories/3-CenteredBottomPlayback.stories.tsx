import React from 'react';

import { CenteredBottomPlayback as CenteredBottomPlaybackComponent } from '../../src/components/centered-bottom-playback/CenteredBottomPlayback';
import { Controls } from '../../src/components/controls/Controls';
import { withCorePlayer, withDemoCard } from '../decorators';

export const CenteredBottomPlayback: React.FC = () => {
	return (
		<Controls>
			<CenteredBottomPlaybackComponent />
		</Controls>
	);
};

export default {
	title: 'Video Player Controls',
	component: CenteredBottomPlayback,
	decorators: [withCorePlayer, withDemoCard],
	parameters: {
		controls: { expanded: true },
	},
};
