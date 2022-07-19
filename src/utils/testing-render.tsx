import { createThemeOptions } from '@collaborne/carrot-styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render as renderRTL } from '@testing-library/react';
import { FC, ReactNode } from 'react';

import { VideoPlayer } from '../components/video-player';

export type RenderResult = ReturnType<typeof render>;
const darkTheme = createTheme(createThemeOptions(true));
export type WrapperProps = { children: ReactNode };

const Wrapper: FC<WrapperProps> = ({ children }) => (
	<ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
);

export const render = <ElementType extends HTMLElement, PropType extends {}>(
	component: React.ReactElement<PropType>,
	container: HTMLElement = document.createElement('div'),
	selector = ':first-child',
) => {
	const view = renderRTL(component, {
		wrapper: Wrapper,
		container: document.body.appendChild(container),
	});
	const elementNode = view.container.querySelector<ElementType>(selector);

	if (!elementNode) {
		throw Error(
			`render:\n\tTested element is not found in render's result.\n\t${
				selector ? 'Use correct' : 'Define'
			} selector argument for call "render".`,
		);
	}
	return {
		element: elementNode,
		body: document.body,
		...view,
	};
};

const VIDEO_URL =
	'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4';

export type VideoComponent = {
	/** *div* wrapper of **video** */
	element: HTMLElement;
	container: HTMLElement;
	onClick: jest.Mock<any, any>;
	onToggle: jest.Mock<any, any>;
	setCurrentPlayingUrl: jest.Mock<any, any>;
};

export const renderComponent = (): VideoComponent => {
	const onClick = jest.fn();
	const onToggle = jest.fn();
	const setCurrentPlayingUrl = jest.fn();
	const view = render(
		<VideoPlayer
			videoUrl={VIDEO_URL}
			currentPlayingUrl={'true'}
			setCurrentPlayingUrl={setCurrentPlayingUrl}
		/>,
	);
	return {
		...view,

		onClick,
		onToggle,
		setCurrentPlayingUrl,
	};
};
