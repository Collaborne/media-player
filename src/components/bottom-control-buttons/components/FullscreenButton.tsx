import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useMediaStore } from '../../../context';
import { useIsAudio } from '../../../hooks/use-is-audio';
import { useOnHoveredControlElement } from '../../../hooks/use-on-hovered-element';
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
	const [isFullscreen, requestFullscreen, exitFullscreen] = useMediaStore(
		state => [
			state.isFullscreen,
			state.requestFullscreen,
			state.exitFullscreen,
		],
	);

	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();
	const isAudio = useIsAudio();

	const onFullscreen = isFullscreen ? exitFullscreen : requestFullscreen;

	if (isAudio) {
		return null;
	}
	return (
		<IconButton
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			size="medium"
			onClick={onFullscreen}
			{...props}
		>
			{!isFullscreen ? (
				<Icons.FullscreenEnter fontSize="medium" {...svgIconProps} />
			) : (
				<Icons.FullscreenExit fontSize="medium" {...svgIconProps} />
			)}
		</IconButton>
	);
};
