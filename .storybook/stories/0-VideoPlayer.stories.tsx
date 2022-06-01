import { Meta, Story } from '@storybook/react';

import { withDemoCard, withTheme } from '../decorators';
import {
	VideoPlayer as VideoPlayerComponent,
	VideoPlayerProps,
} from '../../src/components/video-player';
import { Typography } from '@mui/material';

export const VideoPlayer: Story<VideoPlayerProps> = args => (
	<div>
		<VideoPlayerComponent {...args} />
		<br />
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
		<Typography variant="body2">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
			similique, optio rem maiores numquam neque, repudiandae architecto a
			eligendi tenetur in, vero odit dolorem asperiores molestiae dolorum sed?
			Cum, voluptatibus!
		</Typography>
	</div>
);

export default {
	title: 'Video Player',
	component: VideoPlayer,
	decorators: [withDemoCard, withTheme],
	args: {
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
	},
	argTypes: {
		videoUrl: {
			name: 'props.videoUrl',
			description: 'A video URL. Any ReactPlayer type supported',
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
