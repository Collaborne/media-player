import { action } from '@storybook/addon-actions';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';
import { CenteredBottomPlayback as CenteredBottomPlaybackComponent } from '../../src/components/centered-bottom-playback/centered-bottom-playback';

export const CenteredBottomPlayback = () => {
	return (
		<CenteredBottomPlaybackComponent
			onChangePlaybackRate={action('playBackRate')}
			activePlaybackRate={1}
		/>
	);
};

export default {
	title: 'Video Player Controls',
	component: CenteredBottomPlayback,
	decorators: [withVideoWrapper, withDemoCard, withTheme],
};
