import { FC, useCallback, useMemo } from 'react';

import { VideoProvider } from '../../context/video';
import { ControlsConfig } from '../../types';
import { DEFAULT_CONTROLS_CONFIG } from '../controls/controls-config';

import VideoContainer from './VideoContainer';

export interface VideoPlayerProps {
	videoUrl: string;
	className?: string;
	controlsConfig?: ControlsConfig;
	currentPlayingUrl?: string;
	setCurrentPlayingUrl?: (videoUrl: string) => void;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
	videoUrl,
	className,
	controlsConfig = DEFAULT_CONTROLS_CONFIG,
	currentPlayingUrl,
	setCurrentPlayingUrl,
}) => {
	const hasPlayEnabled = useMemo(
		() => videoUrl === currentPlayingUrl,
		[currentPlayingUrl, videoUrl],
	);

	const onPlay = useCallback(
		() => setCurrentPlayingUrl?.(videoUrl),
		[setCurrentPlayingUrl, videoUrl],
	);

	return (
		<VideoProvider controlsConfig={controlsConfig}>
			<VideoContainer
				className={className}
				videoUrl={videoUrl}
				hasPlayEnabled={hasPlayEnabled}
				onPlay={onPlay}
			/>
		</VideoProvider>
	);
};
