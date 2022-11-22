import { FC, memo } from 'react';
import ReactPlayer from 'react-player';

import { useMediaStore } from '../../context';
import { PROGRESS_INTERVAL, REACT_PLAYER } from '../../utils';

import { useReactPlayerHook } from './useReactPlayerHook';

export interface PlayerProps {
	url: string;
	className?: string;
}

/**
 * Serves for collecting all props from `MediaStore` and passing them to ReactPlayer
 * @category React Component
 */
export const Player: FC<PlayerProps> = memo(({ url, className }) => {
	const isFullscreen = useMediaStore(state => state.isFullscreen);
	const { reactPlayerProps } = useReactPlayerHook({
		url,
	});

	return (
		<ReactPlayer
			url={url}
			progressInterval={PROGRESS_INTERVAL}
			width="100%"
			height={isFullscreen ? '100%' : 'unset'}
			className={className}
			data-testid={REACT_PLAYER}
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
	);
});
