import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { DEFAULT_CONTROLS_CONFIG } from '../../src/components/controls/controls-config';
import { useFilePlayerStyles } from '../../src/components/video-player/useVideoContainerStyles';
import {
	VideoPlayer as VideoPlayerComponent,
	VideoPlayerProps,
} from '../../src/components/video-player/VideoPlayer';
import { withDemoCard, withIntl } from '../decorators';

export const AudioPlayer: Story<VideoPlayerProps> = args => {
	const { wrapper } = useFilePlayerStyles().classes;
	return (
		<>
			<VideoPlayerComponent
				{...args}
				className={wrapper}
				onDelete={action('onDelete')}
				onDownload={action('onDownload')}
				setAsCover={action('setAsCover')}
				removeAsCover={action('removeAsCover')}
			/>
		</>
	);
};

export default {
	title: 'Audio Player',
	component: AudioPlayer,
	decorators: [withDemoCard, withIntl],
	args: {
		videoUrl: `https://assets.mixkit.co/sfx/preview/mixkit-game-show-suspense-waiting-667.mp3`,
		controlsConfig: { ...DEFAULT_CONTROLS_CONFIG, fileActionsPanel: false },
	},
	argTypes: {
		videoUrl: {
			name: 'props.videoUrl',
			description: 'A video URL. Only file type supported',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: undefined },
			},
		},
		controlsConfig: {
			name: 'props.controlsConfig',
			description:
				'An object that controls presence in player of one or another control.',
			table: {
				type: { summary: 'ControlsConfig' },
				defaultValue: { summary: DEFAULT_CONTROLS_CONFIG },
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
