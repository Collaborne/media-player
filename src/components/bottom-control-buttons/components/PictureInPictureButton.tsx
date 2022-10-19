import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useMediaStore } from '../../../context';
import { useOnHoveredControlElement } from '../../../hooks/useOnHoveredControlElement';
import { PiPIcon } from '../../icons';

interface PictureInPictureButtonProps extends IconButtonProps {
	Icon?: ComponentType<SvgIconProps>;
	svgIconProps?: SvgIconProps;
}

export const PictureInPictureButton: FC<PictureInPictureButtonProps> = ({
	Icon = PiPIcon,
	svgIconProps,
	...props
}) => {
	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();
	const [isPip, exitPip, requestPip] = useMediaStore(state => [
		state.isPip,
		state.exitPip,
		state.requestPip,
	]);

	const togglePip = () => {
		if (isPip) {
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
			data-testid="icon-pip"
			{...props}
		>
			<Icon fontSize="medium" {...svgIconProps} />
		</IconButton>
	);
};
