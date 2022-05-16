import { action } from '@storybook/addon-actions';

import { withDemoCard, withTheme, withVideoWrapper } from '../decorators';
import { BottomControlPanel as BottomControlPanelComponent } from '../../src/components/bottom-control-panel/bottom-control-panel.component';

export const BottomControlPanel = () => {
	return (
		<BottomControlPanelComponent
			isFinished={false}
			isPlaying={true}
			volume={60}
			playbackRate={1}
			onPlay={action('onPlay')}
			onFullscreen={action('onFullscreen')}
			onFwd={action('onFwd')}
			onPip={action('onPip')}
			onPlayFromStart={action('onPlayFromStart')}
			onRwd={action('onRwd')}
			onSetPlaybackRate={action('onSetPlaybackRate')}
			onStop={action('onStop')}
			onVolumeChange={action('onVolumeChange')}
		/>
	);
};

export default {
	title: 'Video Player Controls',
	component: BottomControlPanel,
	decorators: [withVideoWrapper, withDemoCard, withTheme],
};
