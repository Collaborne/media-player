import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useVideo } from '../../../hooks';
import { FullscreenEnterIcon, FullscreenExitIcon } from '../../icons';
type FullscreenIcons = {
	FullscreenEnter: ComponentType<SvgIconProps>;
	FullscreenExit: ComponentType<SvgIconProps>;
};
interface FullscreenButtonProps extends IconButtonProps {
	Icons?: FullscreenIcons;
	svgIconProps?: SvgIconProps;
}

export const FullscreenButton: FC<FullscreenButtonProps> = ({
	Icons = {
		FullscreenEnter: FullscreenEnterIcon,
		FullscreenExit: FullscreenExitIcon,
	},
	svgIconProps,
	...props
}) => {
	const { api, fullScreenApi } = useVideo();
	const isFullscreen = Boolean(fullScreenApi?.isFullscreen);
	const onFullscreen = () => {
		if (api?.getPictureInPicture?.()) {
			api?.exitPip?.();
		}
		fullScreenApi?.toggleFullscreen();
	};

	return (
		<IconButton size="medium" onClick={onFullscreen} {...props}>
			{!isFullscreen ? (
				<Icons.FullscreenEnter fontSize="medium" {...svgIconProps} />
			) : (
				<Icons.FullscreenExit fontSize="medium" {...svgIconProps} />
			)}
		</IconButton>
	);
};
