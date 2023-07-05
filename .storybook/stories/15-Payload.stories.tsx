import * as React from 'react';
import {
	createVideoBlobFromImages,
	createVideoFromImageURL,
	dataURLToBlob,
} from '../../src';
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

const IMG_BLOB =
	'data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7';

const Template: Story<Pick<CorePlayerProps, 'initialState'>> = args => {
	const { controls } = useControlsStyles().classes;
	const { wrapper } = useBottomControlButtonsStyles().classes;
	const [videoBlob, setVideoBlob] = React.useState<Blob | undefined>(undefined);

	React.useEffect(() => {
		const getBlob = async () => {
			const blobUrl = await createVideoFromImageURL(
				'https://unsplash.com/s/photos/human',
			);
			setVideoBlob(blobUrl as any);
		};

		getBlob();
	}, []);
	console.log(videoBlob);
	return (
		<video
			src={videoBlob ? URL.createObjectURL(videoBlob) : ''}
			width="640"
			height="380"
		/>
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

export const Payload: Story<CorePlayerProps> = Template.bind({});
Payload.args = {
	initialState: {
		...CORE_PLAYER_INITIAL_STATE,
		autoPlay: true,
	},
};

Payload.argTypes = {
	initialState: {
		name: 'props.initialState',
		description: 'Initial state to configure CorePlayer',
		table: {
			type: { summary: 'CorePlayerInitialState' },
			defaultValue: { summary: JSON.stringify(CORE_PLAYER_INITIAL_STATE) },
		},
	},
};
