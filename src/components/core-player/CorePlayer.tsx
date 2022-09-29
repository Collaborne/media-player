import CssBaseline from '@mui/material/CssBaseline';
import {
	StyledEngineProvider,
	Theme,
	ThemeProvider,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import { VideoContext } from '../../context';
import { VideoProvider } from '../../context/VideoProvider';
import { createPlayerTheme } from '../../theme';
import { Highlight, VideoState } from '../../types';
import { blend, BlendColors } from '../../utils/colors';
import { useFilePlayerStyles } from '../video-container/useVideoContainerStyles';
import { VideoContainer } from '../video-container/VideoContainer';

import { CorePlayerInitialState, PROVIDER_INITIAL_STATE } from './types';

export interface CorePlayerProps {
	/** The url of the video file to be played */
	videoUrl: string;
	/** CSS class name applied to component  */
	className?: string;
	/** A MUI theme to control the stylization of the player . */
	theme?: Theme;
	/** Highlights to be displayed in scrub bar */
	highlights?: Highlight[];
	/** Blending colors for highlights presented in `<ProgressBar>` */
	getHighlightColorBlended?: BlendColors;
	/** A callback that can updates VideoContext outside of the VideoProvider */
	onContext?: (context: VideoContext) => void;
	/** State that needs to be stored in localStorage */
	persistedState?: VideoState;
	/** Provider's initialization state */
	initialState?: CorePlayerInitialState;
	children: ReactNode;
}

export const CorePlayer: FC<CorePlayerProps> = ({
	videoUrl,
	className,
	getHighlightColorBlended = blend,
	highlights,
	onContext,
	theme,
	initialState = PROVIDER_INITIAL_STATE,
	persistedState,
	children,
}) => {
	const nestedThemes = deepmerge(createPlayerTheme(), theme || {});
	const { wrapper } = useFilePlayerStyles().classes;
	const classNames = clsx(wrapper, className);
	return (
		<ThemeProvider theme={nestedThemes}>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<VideoProvider
					initialState={initialState}
					persistedState={persistedState}
					getHighlightColorBlended={getHighlightColorBlended}
					onContext={onContext}
					highlights={highlights}
				>
					<VideoContainer className={classNames} videoUrl={videoUrl}>
						{children}
					</VideoContainer>
				</VideoProvider>
			</StyledEngineProvider>
		</ThemeProvider>
	);
};
