import { Meta } from '@storybook/react';

export const bottomControlPanelStoryArgTypes: Meta['argTypes'] = {
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
};

export const bottomControlPanelStoryArgs: Meta['args'] = {
	isFinished: true,
	isPlaying: false,
	volume: 60,
	duration: 951000,
	currentTime: 60000,
};
