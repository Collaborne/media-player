import { action } from '@storybook/addon-actions';

import { CenteredPlayButton as CenteredPlayButtonComponent } from '../../src/components/centered-play-button/centered-play-button';
import { CenteredBottomPlayback as CenteredBottomPlaybackComponent } from '../../src/components/centered-bottom-playback/centered-bottom-playback';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';

export const CenteredPlayButton = () => {
	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				display: 'flex',
				flexDirection: 'row-reverse',
			}}
		>
			<CenteredPlayButtonComponent
				onClick={action('onClickPlay')}
				style={{ position: 'absolute' }}
			/>
			<CenteredBottomPlaybackComponent
				onChangePlaybackRate={action('playBackRate')}
				activePlaybackRate={1}
			/>
		</div>
	);
};

export default {
	title: 'Video Player Controls',
	component: CenteredPlayButton,
	decorators: [withVideoWrapper, withDemoCard, withTheme],
};
