import CssBaseline from '@mui/material/CssBaseline';
import {
	StyledEngineProvider,
	Theme,
	ThemeProvider,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { FC } from 'react';

import { VideoProvider } from '../../context/video';
import { createPlayerTheme } from '../../theme';
import { Highlight, VideoProviderProps } from '../../types';
import { DEFAULT_CONTROLS_CONFIG } from '../controls/controls-config';
import { FileActionPanelProps } from '../file-action-panel/FileActionPanel';

import { VideoContainer } from './VideoContainer';

export interface VideoPlayerProps
	extends Omit<FileActionPanelProps, 'className'>,
		Pick<
			VideoProviderProps,
			'controlsConfig' | 'getHighlightColorBlended' | 'onContext'
		> {
	/** The url of the video file to be played */
	videoUrl: string;
	/** CSS class name applied to component  */
	className?: string;
	/**  Used when you have multiple videos, and only one video is played at same time. *Ex: Video 1 plays, and video 2 is on pause. Playing video 2, pauses video 1*   */
	currentPlayingUrl?: string;
	/** A function that handles changing of the currentPlayingUrl */
	setCurrentPlayingUrl?: (videoUrl: string) => void;
	/** A MUI theme to control the stylization of the player . */
	theme?: Theme;
	/** CSS class name applied to the file action panel */
	actionPanelClassName?: string;
	/** Highlights to be displayed in scrub bar */
	highlights?: Highlight[];
}

/** A "video-player" from the box. A result of VideoProvider and VideoContainer */
export const VideoPlayer: FC<VideoPlayerProps> = ({
	videoUrl,
	className,
	controlsConfig = DEFAULT_CONTROLS_CONFIG,
	theme,

	onContext,
	highlights,
}) => {
	const nestedThemes = deepmerge(createPlayerTheme(), theme || {});

	return (
		<ThemeProvider theme={nestedThemes}>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<VideoProvider
					controlsConfig={controlsConfig}
					onContext={onContext}
					highlights={highlights}
				>
					<VideoContainer className={className} videoUrl={videoUrl} />
				</VideoProvider>
			</StyledEngineProvider>
		</ThemeProvider>
	);
};
