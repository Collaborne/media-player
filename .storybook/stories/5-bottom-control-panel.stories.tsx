import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';
import {
	BottomControlPanel as BottomControlPanelComponent,
	BottomControlPanelProps,
} from '../../src/components/bottom-control-panel/bottom-control-panel';

export const BottomControlPanel: Story<
	Partial<BottomControlPanelProps>
> = args => {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column-reverse',
			}}
		>
			<BottomControlPanelComponent
				isFinished={args.isFinished ?? false}
				isPlaying={args.isPlaying ?? false}
				volume={args.volume ?? 0}
				currentTime={args.currentTime ?? 0}
				duration={args.duration ?? 0}
				playbackRate={1}
				onPlay={action('onPlay')}
				onFullscreen={action('onFullscreen')}
				onFwd={action('onFwd')}
				onPip={action('onPip')}
				onRwd={action('onRwd')}
				onReplay={action('onReplay')}
				onSetPlaybackRate={action('onSetPlaybackRate')}
				onStop={action('onStop')}
				onVolumeChange={action('onVolumeChange')}
			/>
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: BottomControlPanel,
	decorators: [withVideoWrapper, withDemoCard, withTheme],
	args: {
		isFinished: true,
		isPlaying: false,
		volume: 60,
		duration: 951000,
		currentTime: 60000,
	},
	argTypes: {
		isFinished: {
			name: 'props.isFinished',
			description: 'Displays when video has finished playing ',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
		isPlaying: {
			name: 'props.isPlaying',
			description: 'Display video playing status ',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
		volume: {
			name: 'props.volume',
			description:
				'Videos playing volume. Icon switches according to  inputted volume ',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 60 },
			},
		},
		duration: {
			name: 'props.duration',
			description: 'Total video duration.  In milliseconds ',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 0 },
			},
		},
		currentTime: {
			name: 'props.currentDuration',
			description: 'Current played time. In milliseconds',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 0 },
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
