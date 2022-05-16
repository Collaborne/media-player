import { action } from '@storybook/addon-actions';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';
import { ProgressBar as ProgressBarComponent } from '../../src/components/progress-bar/progress-bar';

export const ProgressBar = () => {
	return (
		<ProgressBarComponent min={0} max={100} onChange={action('onChange')} />
	);
};

export default {
	title: 'Video Player Controls',
	component: ProgressBar,
	decorators: [withVideoWrapper, withDemoCard, withTheme],
};
