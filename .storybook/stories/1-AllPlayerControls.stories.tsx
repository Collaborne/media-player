import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CenteredPlayButton as CenteredPlayButtonComponent } from '../../src/components/centered-play-button/CenteredPlayButton';
import {
	CenteredBottomPlayback as CenteredBottomPlaybackComponent,
	CenteredBottomPlaybackProps,
} from '../../src/components/centered-bottom-playback/CenteredBottomPlayback';
import { withTheme, withDemoCard, withVideoWrapper } from '../decorators';

import { ProgressBar } from '../../src/components/progress-bar/ProgressBar';
import {
	BottomControlPanel as BottomControlPanelComponent,
	BottomControlPanelProps,
} from '../../src/components/bottom-control-panel/BottomControlPanel';
import {
	bottomControlPanelStoryArgs,
	bottomControlPanelStoryArgTypes,
} from './shared/bottom-control-panel.args';

interface AllPlayerControlsProps
	extends CenteredBottomPlaybackProps,
		Partial<BottomControlPanelProps> {
	isFirstView: boolean;
}

export const AllPlayerControls: Story<AllPlayerControlsProps> = args => {
	if (args.isFirstView) {
		return (
			<div
				style={{
					position: 'relative',
					width: '100%',
				}}
			>
				<div style={{ width: '100%', height: '100%' }}>
					<CenteredPlayButtonComponent onClick={action('onClickPlay')} />
				</div>
				<div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
					<CenteredBottomPlaybackComponent
						onChangePlaybackRate={action('playBackRate')}
						activePlaybackRate={1}
					/>
				</div>
			</div>
		);
	}

	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column',
			}}
		>
			<div style={{ flex: 1 }} />
			<ProgressBar />
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
	component: AllPlayerControls,
	decorators: [withVideoWrapper, withDemoCard, withTheme],
	args: {
		isFirstView: true,
		...bottomControlPanelStoryArgs,
	},
	argTypes: {
		isFirstView: {
			description:
				'Displays first video player view(after buffer/loading state)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: true },
			},
		},
		...bottomControlPanelStoryArgTypes,
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
