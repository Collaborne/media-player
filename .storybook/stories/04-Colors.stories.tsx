import { Colors as ColorsComponent } from '../components/colors/Colors';
import { withDemoCard } from '../decorators';
import { withPlayerTheme } from '../decorators/with-player-theme';

export const Colors = () => {
	return <ColorsComponent />;
};

export default {
	title: 'UI Kit',
	component: Colors,
	decorators: [withDemoCard, withPlayerTheme],
};
