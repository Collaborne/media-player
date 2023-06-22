import React from 'react';

import {
	BottomControls,
	CORE_PLAYER_INITIAL_STATE,
	CorePlayer,
	CorePlayerProps,
	PictureInPictureButton,
	PlayPauseReplay,
} from '../../src/components';
import { useBottomControlButtonsStyles } from '../../src/components/bottom-control-buttons/useBottomControlButtonsStyles';
import { useControlsStyles } from '../../src/components/controls/useControlsStyles';
import { CustomPipControls } from '../components/custom-pip-controls/CustomPipControls';
import { withDemoCard } from '../decorators';
import { Story } from '../utils/doc';

const Template: Story<Pick<CorePlayerProps, 'initialState'>> = args => {
	const { controls } = useControlsStyles().classes;
	const { wrapper } = useBottomControlButtonsStyles().classes;
	return (
		<CorePlayer
			url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
			PIPControls={CustomPipControls}
			initialState={args.initialState}
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
	title: 'CorePlayer',
	component: CorePlayer,
	decorators: [withDemoCard],
	parameters: {
		controls: { expanded: true },
	},
};

export const InitialState: Story<CorePlayerProps> = Template.bind({});
InitialState.args = {
	initialState: {
		...CORE_PLAYER_INITIAL_STATE,
		autoPlay: true,
	},
};

InitialState.argTypes = {
	initialState: {
		name: 'props.initialState',
		description: 'Initial state to configure CorePlayer',
		table: {
			type: { summary: 'CorePlayerInitialState' },
			defaultValue: { summary: JSON.stringify(CORE_PLAYER_INITIAL_STATE) },
		},
	},
};
