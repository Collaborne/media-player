import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';
import {
	BottomControlPanel as BottomControlPanelComponent,
	BottomControlPanelProps,
} from '../../src/components/bottom-control-panel/bottom-control-panel';

import {
	bottomControlPanelStoryArgTypes,
	bottomControlPanelStoryArgs,
} from './shared/bottom-control-panel.args';

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
				onMute={action('onMute')}
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
		...bottomControlPanelStoryArgs,
	},
	argTypes: {
		...bottomControlPanelStoryArgTypes,
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
