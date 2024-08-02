import { FC, memo, ReactNode } from 'react';

import { CorePlayer, CorePlayerProps } from '../core-player/CorePlayer';

import { MediaPlayerControls } from './components/MediaPlayerControls';
import { useMediaPlayerStyles } from './useMediaPlayerStyles';

export interface MediaPlayerProps
	extends Omit<
		CorePlayerProps,
		'children' | 'isPipEnabled' | 'pipPortalClassName' | 'pipContainer'
	> {
	classes?: {
		collapsedClassName?: string;
	};
	children?: ReactNode;
	collapse?: boolean;
	onToggleCollapse?: VoidFunction;
}

/**
 * Out of the box media player, with all functionality and UI included
 * @category React Component
 * @category Player
 */
export const MediaPlayer: FC<MediaPlayerProps> = memo(
	({
		children,
		className,
		classes,
		collapse,
		onToggleCollapse,
		...corePlayerProps
	}) => {
		const isCollapsed = Boolean(collapse);

		const { classes: mediaClasses, cx } = useMediaPlayerStyles();

		const collapsedClassName = cx({
			[classes?.collapsedClassName ?? mediaClasses.collapsedContainer]:
				isCollapsed,
		});

		return (
			<CorePlayer
				{...corePlayerProps}
				className={cx(className, collapsedClassName)}
				isPipEnabled={false}
			>
				<MediaPlayerControls
					isCollapsed={isCollapsed}
					toggleCollapse={onToggleCollapse}
				/>
				{children}
			</CorePlayer>
		);
	},
);
