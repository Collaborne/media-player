import React, { FC } from 'react';
import ReactPlayer, { Config } from 'react-player';

interface VideoPlayerProps {
	videoUrl: string;
	videoWidth?: number;
	videoHeight?: number;
	classNames?: string;
	config?: Config;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
	videoUrl,
	classNames,
	config,
}) => {
	return (
		<div>
			<ReactPlayer
				className={classNames}
				url={videoUrl}
				controls
				progressInterval={50}
				{...config}
			/>
		</div>
	);
};
