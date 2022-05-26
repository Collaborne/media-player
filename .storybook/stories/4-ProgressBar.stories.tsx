import { action } from '@storybook/addon-actions';

import {
	withDemoCard,
	withTheme,
	withVideoProvider,
	withVideoWrapper,
} from '../decorators';
import { ProgressBar as ProgressBarComponent } from '../../src/components/progress-bar/ProgressBar';

export const ProgressBar = () => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'end',
				width: '100%',
				position: 'relative',
			}}
		>
			<ProgressBarComponent
				min={0}
				max={100}
				value={30}
				onChange={action('onChange')}
			/>
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: ProgressBar,
	decorators: [withVideoProvider, withVideoWrapper, withDemoCard, withTheme],
};
