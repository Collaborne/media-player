import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';
import { PiPictureInPicture } from 'react-icons/pi';
import { shallow } from 'zustand/shallow';

import { useMediaStore } from '../../../context';
import { useOnHoveredControlElement } from '../../../hooks/use-on-hovered-element';
import { PIP_BUTTON } from '../../../utils';

interface PictureInPictureButtonProps extends IconButtonProps {
	Icon?: ComponentType<SvgIconProps>;
	svgIconProps?: SvgIconProps;
	'data-testid'?: string;
}

/**
 * @category React Component
 * @category UI Controls
 */
export const PictureInPictureButton: FC<PictureInPictureButtonProps> = ({
	Icon = PiPictureInPicture,
	svgIconProps,
	'data-testid': dataTestId = PIP_BUTTON,
	...props
}) => {
	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();
	const [isPip, exitPip, requestPip, setHasPipTriggeredByClick] = useMediaStore(
		state => [
			state.isPip,
			state.exitPip,
			state.requestPip,
			state.setHasPipTriggeredByClick,
		],
		shallow,
	);

	const togglePip = () => {
		if (isPip) {
			setHasPipTriggeredByClick(true);
			return exitPip();
		}
		return requestPip();
	};

	return (
		<IconButton
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			size="medium"
			onClick={togglePip}
			data-testid={dataTestId}
			{...props}
		>
			<Icon fontSize="medium" {...svgIconProps} />
		</IconButton>
	);
};
