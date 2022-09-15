import { ThemeProvider } from '@mui/material/styles';
import { render as renderRTL, RenderOptions } from '@testing-library/react';
import { FC, ReactNode, useRef } from 'react';

import { PROVIDER_INITIAL_STATE } from '../components/core-player/types';
import { VideoContext } from '../context/video';
import { VideoProvider } from '../context/VideoProvider';
import { createPlayerTheme } from '../theme';

import { blend } from './colors';
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

export type RenderResult = ReturnType<typeof renderWithProviders>;
const playerTheme = createPlayerTheme();

export const renderWithProviders = (
	Component: ReactNode,
	options?: RenderOptions,
) =>
	renderRTL(
		<VideoProvider
			initialState={PROVIDER_INITIAL_STATE}
			getHighlightColorBlended={blend}
		>
			<ThemeProvider theme={playerTheme}>{Component}</ThemeProvider>
		</VideoProvider>,
		options,
	);

interface TestingVideoProviderProps
	extends Omit<VideoContext, 'videoContainerRef'> {
	children?: ReactNode;
}
export const TestingVideoProvider: FC<TestingVideoProviderProps> = ({
	children,
	...props
}) => {
	const videoContainerRef = useRef<HTMLDivElement>(null);
	const value = { ...props, videoContainerRef };
	return (
		<VideoContext.Provider value={value}>{children}</VideoContext.Provider>
	);
};
