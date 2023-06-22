import { FC, memo } from 'react';
import ReactPlayer from 'react-player';

import { ReactPlayerProps } from '../../types';
import { PROGRESS_INTERVAL, REACT_PLAYER } from '../../utils';

import { usePlayerHook } from './usePlayerHook';

export interface PlayerProps {
	url: string;
	className?: string;
	isFullscreen: boolean;
	reactPlayerProps: ReactPlayerProps;
}

/**
 * Serves for collecting all props from `MediaStore` and passing them to ReactPlayer
 * @category React Component
 */
export const Player: FC<PlayerProps> = memo(
	({ url, className, isFullscreen, reactPlayerProps }) => {
		usePlayerHook({ url });

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
							autoPlay: reactPlayerProps.autoPlay,
						},
					},
				}}
				{...reactPlayerProps}
			/>
		);
	},
);
