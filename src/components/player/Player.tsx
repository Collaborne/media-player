import { FC, memo } from 'react';
import ReactPlayer from 'react-player';

import { ReactPlayerProps } from '../../types';
import { REACT_PLAYER } from '../../utils';

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
			<div className={className} data-testid={REACT_PLAYER}>
				<ReactPlayer
					src={url}
					width="100%"
					height="100%"
					preload="none"
					{...reactPlayerProps}
				/>
			</div>
		);
	},
);
