import { FC } from 'react';
import ReactPlayer from 'react-player';

import { useMediaStore } from '../../context';
import { PROGRESS_INTERVAL } from '../../utils';

import { useReactPlayerHook } from './useReactPlayerHook';

export interface PlayerProps {
	url: string;

	className?: string;
}

export const Player: FC<PlayerProps> = ({ url, className }) => {
	const isFullscreen = useMediaStore(state => state.isFullscreen);
	const { reactPlayerProps } = useReactPlayerHook({
		url,
	});

	return (
		<div>
			<ReactPlayer
				url={url}
				progressInterval={PROGRESS_INTERVAL}
				width="100%"
				height={isFullscreen ? '100%' : 'unset'}
				className={className}
				data-testid="media-player"
				config={{
					file: {
						attributes: {
							crossOrigin: 'anonymous',
							preload: 'false',
						},
					},
				}}
				{...reactPlayerProps}
			/>
		</div>
	);
};
