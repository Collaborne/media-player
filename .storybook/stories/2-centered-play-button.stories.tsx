import { action } from '@storybook/addon-actions';

import { CenteredPlayButton as CenteredPlayButtonComponent } from '../../src/components/centered-play-button/centered-play-button';
import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';

export const CenteredPlayButton = () => {
	return <CenteredPlayButtonComponent onClick={action('onClickPlay')} />;
};

export default {
	title: 'Video Player Controls',
	component: CenteredPlayButton,
	decorators: [withVideoWrapper, withDemoCard, withTheme],
};
