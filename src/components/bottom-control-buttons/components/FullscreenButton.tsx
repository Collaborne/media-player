import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';
import { PiCornersIn, PiCornersOut } from 'react-icons/pi';
import { shallow } from 'zustand/shallow';

import { useMediaStore } from '../../../context';
import { useIsAudio } from '../../../hooks/use-is-audio';
import { useOnHoveredControlElement } from '../../../hooks/use-on-hovered-element';
import { FULLSCREEN_BUTTON } from '../../../utils';

type FullscreenIcons = {
	FullscreenEnter: ComponentType<SvgIconProps>;
	FullscreenExit: ComponentType<SvgIconProps>;
};
interface FullscreenButtonProps extends IconButtonProps {
	Icons?: FullscreenIcons;
	svgIconProps?: SvgIconProps;
	'data-test-id'?: string;
}
/**
 * @category React Component
 * @category UI Controls
 */
export const FullscreenButton: FC<FullscreenButtonProps> = ({
	Icons = {
		FullscreenEnter: PiCornersOut,
		FullscreenExit: PiCornersIn,
	},
	svgIconProps,
	'data-test-id': dataTestId = FULLSCREEN_BUTTON,
	...props
}) => {
	const [isFullscreen, requestFullscreen, exitFullscreen] = useMediaStore(
		state => [
			state.isFullscreen,
			state.requestFullscreen,
			state.exitFullscreen,
		],
		shallow,
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
			data-testid={dataTestId}
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
