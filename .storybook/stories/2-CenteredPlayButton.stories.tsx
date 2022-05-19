import { action } from '@storybook/addon-actions';

import { CenteredPlayButton as CenteredPlayButtonComponent } from '../../src/components/centered-play-button/CenteredPlayButton';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';

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
	decorators: [withVideoWrapper, withDemoCard, withTheme],
};
