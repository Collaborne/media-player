import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useMediaStore } from '../../../context';
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
	const isFullscreen = useMediaStore(state => state.isFullscreen);
	const requestFullscreen = useMediaStore(state => state.requestFullscreen);
	const exitFullscreen = useMediaStore(state => state.exitFullscreen);
	const onFullscreen = isFullscreen ? exitFullscreen : requestFullscreen;
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
