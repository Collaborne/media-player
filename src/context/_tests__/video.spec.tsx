import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import { renderComponent, VideoComponent } from '../../utils/testing-render';
import { act } from 'react-dom/test-utils';
import { useVideo } from '../../hooks';

const getClickOn =
	(component: VideoComponent) => async (params?: { element?: HTMLElement }) => {
		const { element = component.element } = params ?? {};

		jest.clearAllMocks();
		console.log('click');
		await userEvent.click(element);
	};

describe('<VideoProvider/>', () => {
	it('check play/pause/fwd/rwd', async () => {
		const renderedPlayer = renderComponent();
		console.log(renderedPlayer);
		await act(async () => await getClickOn(renderedPlayer));
		const { state } = useVideo();
	});
	it('check volume change', () => {});
	it('check playbackRate', () => {});
	it('check setDuration/getDuration', () => {});
	it('check pip mode', () => {});
	it('check fullscreen mode', () => {});
});
