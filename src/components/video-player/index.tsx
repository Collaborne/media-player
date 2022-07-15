import { Theme, ThemeProvider } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { FC, useCallback, useMemo } from 'react';

import { VideoProvider } from '../../context/video';
import { playerTheme } from '../../theme';
import { ControlsConfig } from '../../types';
import { DEFAULT_CONTROLS_CONFIG } from '../controls/controls-config';
import { FileActionPanelProps } from '../file-action-panel/FileActionPanel';

import VideoContainer from './VideoContainer';

export interface VideoPlayerProps
	extends Omit<FileActionPanelProps, 'className'> {
	videoUrl: string;
	className?: string;
	controlsConfig?: ControlsConfig;
	currentPlayingUrl?: string;
	setCurrentPlayingUrl?: (videoUrl: string) => void;
	theme?: Theme;
	actionPanelClassName?: string;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
	videoUrl,
	className,
	controlsConfig = DEFAULT_CONTROLS_CONFIG,
	currentPlayingUrl,
	setCurrentPlayingUrl,
	theme,
	onDelete,
	onDownload,
	removeAsCover,
	setAsCover,
	hasImageCover,
	isCover,
	actionPanelClassName,
}) => {
	const hasPlayEnabled = useMemo(
		() => videoUrl === currentPlayingUrl,
		[currentPlayingUrl, videoUrl],
	);

	const onPlay = useCallback(
		() => setCurrentPlayingUrl?.(videoUrl),
		[setCurrentPlayingUrl, videoUrl],
	);

	const nestedThemes = useMemo(
		() => deepmerge(playerTheme, theme || {}),
		[theme],
	);

	return (
		<ThemeProvider theme={outerTheme => deepmerge(outerTheme, nestedThemes)}>
			<VideoProvider controlsConfig={controlsConfig}>
				<VideoContainer
					className={className}
					videoUrl={videoUrl}
					hasPlayEnabled={hasPlayEnabled}
					onPlay={onPlay}
					onDelete={onDelete}
					onDownload={onDownload}
					removeAsCover={removeAsCover}
					setAsCover={setAsCover}
					actionPanelClassName={actionPanelClassName}
					hasImageCover={hasImageCover}
					isCover={isCover}
				/>
			</VideoProvider>
		</ThemeProvider>
	);
};
