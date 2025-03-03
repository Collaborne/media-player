import { StoryFn } from '@storybook/react';
import { useToggle } from 'react-use';
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

export const Basic: StoryFn<MediaPlayerProps> = args => {
	const { classes } = useStyles();
	const [collapse, toggleCollapse] = useToggle(true);

	return (
		<div className={classes.wrapper}>
			<MediaPlayer
				{...args}
				collapse={collapse}
				onToggleCollapse={toggleCollapse}
			/>
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
	},
	parameters: {
		controls: { expanded: true },
	},
};
