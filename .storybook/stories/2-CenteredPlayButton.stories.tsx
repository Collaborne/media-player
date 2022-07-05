import { action } from '@storybook/addon-actions';

import { CenteredPlayButton as CenteredPlayButtonComponent } from '../../src/components/centered-play-button/CenteredPlayButton';
import {
	withDemoCard,
	withTheme,
	withVideoProvider,
	withVideoWrapper,
} from '../decorators';

export const CenteredPlayButton = () => {
	return (
		<div
			style={{
				width: '100%',
			}}
		>
			<CenteredPlayButtonComponent onClick={action('onClickPlay')} />
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: CenteredPlayButton,
	decorators: [withVideoProvider, withVideoWrapper, withDemoCard, withTheme],
};
