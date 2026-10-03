import React from 'react';

import {
	BottomControls,
	CorePlayer,
	PictureInPictureButton,
	PlayPauseReplay,
} from '../../src/components';
import { useBottomControlButtonsStyles } from '../../src/components/bottom-control-buttons/useBottomControlButtonsStyles';
import { useControlsStyles } from '../../src/components/controls/useControlsStyles';
import { CustomPipControls } from '../components/custom-pip-controls/CustomPipControls';
import { withDemoCard } from '../decorators';

export const PIPControls: React.FC = () => {
	const { controls } = useControlsStyles().classes;
	const { wrapper } = useBottomControlButtonsStyles().classes;
	return (
		<CorePlayer
			url="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
			PIPControls={CustomPipControls}
		>
			<div className={controls}>
				<BottomControls>
					<div className={wrapper}>
						<PlayPauseReplay svgClassName="medium" />
						<PictureInPictureButton />
					</div>
				</BottomControls>
			</div>
		</CorePlayer>
	);
};

export default {
	title: 'Media Player Controls',
	component: PIPControls,
	decorators: [withDemoCard],
	parameters: {
		controls: { expanded: true },
	},
};
