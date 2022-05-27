import { Meta, Story } from '@storybook/react';

import { CenteredPlayButton as CenteredPlayButtonComponent } from '../../src/components/centered-play-button/CenteredPlayButton';
import {
	CenteredBottomPlayback as CenteredBottomPlaybackComponent,
	CenteredBottomPlaybackProps,
} from '../../src/components/centered-bottom-playback/CenteredBottomPlayback';
import {
	withTheme,
	withDemoCard,
	withVideoWrapper,
	withVideoProvider,
} from '../decorators';

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
					<CenteredPlayButtonComponent />
				</div>
				<div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
					<CenteredBottomPlaybackComponent />
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
			<BottomControlPanelComponent />
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: AllPlayerControls,
	decorators: [withVideoProvider, withVideoWrapper, withDemoCard, withTheme],
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
