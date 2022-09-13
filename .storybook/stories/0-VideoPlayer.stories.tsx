import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';

import { DEFAULT_CONTROLS_CONFIG } from '../../src/components/controls/controls-config';
import { useFilePlayerStyles } from '../../src/components/video-player/useVideoContainerStyles';
import {
	VideoPlayer as VideoPlayerComponent,
	VideoPlayerProps,
} from '../../src/components/video-player/VideoPlayer';
import { withDemoCard, withIntl } from '../decorators';

export const VideoPlayer: Story<VideoPlayerProps> = args => {
	const [currentPlayingUrl, setCurrentPlayingUrl] = useState<string>('');

	const { wrapper } = useFilePlayerStyles().classes;
	return (
		<>
			<VideoPlayerComponent
				{...args}
				className={wrapper}
				currentPlayingUrl={currentPlayingUrl}
				setCurrentPlayingUrl={setCurrentPlayingUrl}
				onDelete={action('onDelete')}
				onDownload={action('onDownload')}
				setAsCover={action('setAsCover')}
				removeAsCover={action('removeAsCover')}
			/>
			<br />
			{/* <VideoPlayerComponent
				{...args}
				videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
				className={wrapper}
				currentPlayingUrl={currentPlayingUrl}
				setCurrentPlayingUrl={setCurrentPlayingUrl}
				onDelete={action('onDelete')}
				onDownload={action('onDownload')}
				setAsCover={action('setAsCover')}
				removeAsCover={action('removeAsCover')}
			/>
			<br />
			<VideoPlayerComponent
				{...args}
				videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
				className={wrapper}
				currentPlayingUrl={currentPlayingUrl}
				setCurrentPlayingUrl={setCurrentPlayingUrl}
				onDelete={action('onDelete')}
				onDownload={action('onDownload')}
				setAsCover={action('setAsCover')}
				removeAsCover={action('removeAsCover')}
			/>
			<br />
			<VideoPlayerComponent
				{...args}
				videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
				className={wrapper}
				currentPlayingUrl={currentPlayingUrl}
				setCurrentPlayingUrl={setCurrentPlayingUrl}
				onDelete={action('onDelete')}
				onDownload={action('onDownload')}
				setAsCover={action('setAsCover')}
				removeAsCover={action('removeAsCover')}
			/> */}
		</>
	);
};

export default {
	title: 'Video Player',
	component: VideoPlayer,
	decorators: [withDemoCard, withIntl],
	args: {
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		controlsConfig: DEFAULT_CONTROLS_CONFIG,
		hasImageCover: false,
		isCover: false,
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
		hasImageCover: {
			name: 'props.hasImageCover',
			description:
				'Video has a cover image! Some video do not have thumbnails!',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
		isCover: {
			name: 'props.isCover',
			description: `If this video's thumbnails is set as a cover image`,
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
		actionPanelClassName: {
			name: 'props.actionPanelClassName',
			description:
				'Class name applied to div*wrapper of the component FileActionPanel',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: undefined },
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
