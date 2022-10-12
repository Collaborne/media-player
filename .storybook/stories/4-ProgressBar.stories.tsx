import React from 'react';

import { BottomControls } from '../../src/components/bottom-controls/BottomControls';
import { Controls } from '../../src/components/controls/Controls';
import { ProgressBar as ProgressBarComponent } from '../../src/components/progress-bar/ProgressBar';
import { withCorePlayer, withDemoCard } from '../decorators';

export const ProgressBar: React.FC = () => {
	return (
		<>
			<Controls>
				<BottomControls>
					<ProgressBarComponent />
				</BottomControls>
			</Controls>
		</>
	);
};

export default {
	title: 'Media Player Controls',
	component: ProgressBar,
	decorators: [withCorePlayer, withDemoCard],
	parameters: {
		controls: { expanded: true },
	},
};
