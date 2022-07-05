import { FC, useCallback, useMemo } from 'react';

import { VideoProvider } from '../../context/video';
import { ControlsConfig } from '../../types';
import { DEFAULT_CONTROLS_CONFIG } from '../controls/controls-config';

import VideoContainer from './VideoContainer';

import { playerTheme } from '../../theme/theme';
import { DefaultTheme, ThemeProvider } from '@mui/styles';
import { deepmerge } from '@mui/utils';
import { StyledEngineProvider } from '@mui/material';

export interface VideoPlayerProps {
	videoUrl: string;
	className?: string;
	controlsConfig?: ControlsConfig;
	currentPlayingUrl?: string;
	setCurrentPlayingUrl?: (videoUrl: string) => void;
	theme?: DefaultTheme;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
	videoUrl,
	className,
	controlsConfig = DEFAULT_CONTROLS_CONFIG,
	currentPlayingUrl,
	setCurrentPlayingUrl,
	theme,
}) => {
	const hasPlayEnabled = useMemo(
		() => videoUrl === currentPlayingUrl,
		[currentPlayingUrl, videoUrl],
	);

	const onPlay = useCallback(
		() => setCurrentPlayingUrl?.(videoUrl),
		[setCurrentPlayingUrl, videoUrl],
	);

	const nestedThemes = useMemo(() => deepmerge(playerTheme, theme), [theme]);

	// Nesting themes with the c-app theme! Without outer fails
	return (
		<ThemeProvider theme={outerTheme => deepmerge(outerTheme, playerTheme)}>
			<StyledEngineProvider>
				<VideoProvider controlsConfig={controlsConfig}>
					<VideoContainer
						className={className}
						videoUrl={videoUrl}
						hasPlayEnabled={hasPlayEnabled}
						onPlay={onPlay}
					/>
				</VideoProvider>
			</StyledEngineProvider>
		</ThemeProvider>
	);
};
