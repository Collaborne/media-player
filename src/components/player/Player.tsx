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
	({ url, className, reactPlayerProps }) => {
		usePlayerHook({ url });

		return (
			<ReactPlayer
				url={url}
				progressInterval={PROGRESS_INTERVAL}
				width="unset"
				height="100%"
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
