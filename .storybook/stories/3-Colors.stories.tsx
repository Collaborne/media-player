import { Colors as ColorsComponent } from '../components/colors/Colors.js';
import { withDemoCard } from '../decorators/index.js';
import { withPlayerTheme } from '../decorators/with-player-theme.js';

export const Colors = () => {
	return <ColorsComponent />;
};

export default {
	title: 'UI Kit',
	component: Colors,
	decorators: [withDemoCard, withPlayerTheme],
};
