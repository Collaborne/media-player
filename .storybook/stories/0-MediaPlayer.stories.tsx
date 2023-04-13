import { Paper } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { makeStyles } from 'tss-react/mui';

import {
	MediaPlayer,
	MediaPlayerProps,
} from '../../src/components/media-player/MediaPlayer';
import { withDemoCard, withIntl, withPlayerTheme } from '../decorators';
const useStyles = makeStyles()(theme => ({
	wrapper: {
		height: theme.spacing(500),
	},
	pipContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'fixed',
		bottom: theme.spacing(1),
		left: theme.spacing(1),
		width: `calc(100% - ${theme.spacing(2)})`,
		height: theme.spacing(30),
	},
	pipLayout: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
	},
}));

export const Basic: Story<MediaPlayerProps> = args => {
	const { classes } = useStyles();

	return (
		<div className={classes.wrapper}>
			<MediaPlayer {...args} />
		</div>
	);
};

export const PIPModifiers: Story<MediaPlayerProps> = args => {
	const pipContainer = React.useRef<HTMLDivElement>(null);
	const { classes } = useStyles();

	return (
		<div className={classes.wrapper}>
			<MediaPlayer
				pipContainer={pipContainer}
				pipPortalClassName={classes.pipLayout}
				{...args}
			/>
			<Paper elevation={3} ref={pipContainer} className={classes.pipContainer}>
				PIP can be dragged only here
			</Paper>
		</div>
	);
};
export default {
	title: 'Media Player',
	component: MediaPlayer,
	decorators: [withDemoCard, withIntl, withPlayerTheme],
	args: {
		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		mediaType: undefined,
		xAxisDistance: 0,
		yAxisDistance: 0,
		isPipEnabled: true,
	},
	argTypes: {
		url: {
			name: 'props.url',
			description: 'A media URL. Only file type supported',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: undefined },
			},
		},
		mediaType: {
			name: 'props.mediaType',
			description:
				'Initial media type that will enforce to build corresponding UI ',
			table: {
				type: { summary: 'MediaType' },
				defaultValue: { summary: undefined },
			},
		},
		isPipEnabled: {
			name: 'props.isPipEnabled',
			description:
				'Enables/disables all pip features(scrolling, entering/leaving PIP mode)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: true },
			},
		},
		yAxisDistance: {
			name: 'props.yAxisDistance',
			description:
				'Distance from window border bottom, on Y axis in `pixels`, for PIP player position initialization ',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 16 },
			},
		},
		xAxisDistance: {
			name: 'props.xAxisDistance',
			description:
				'Distance from window border right, on X axis in `pixels`, for PIP player position initialization',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 16 },
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
} as Meta;
