import { FC } from 'react';
import { VideoProvider } from '../../context/video';
import { ControlsConfig } from '../../types';
import { DEFAULT_CONTROLS_CONFIG } from '../controls/controls-config';
import VideoContainer from './VideoContainer';

export interface VideoPlayerProps {
	videoUrl: string;
	className?: string;
	controlsConfig?: ControlsConfig;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
	videoUrl,
	className,
	controlsConfig = DEFAULT_CONTROLS_CONFIG,
}) => {
	return (
		<VideoProvider controlsConfig={controlsConfig}>
			<VideoContainer className={className} videoUrl={videoUrl} />
		</VideoProvider>
	);
};
