import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useVideoStore } from '../../../context';
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
	const pip = useVideoStore(state => state.pip);
	const exitPip = useVideoStore(state => state.exitPip);
	const requestPip = useVideoStore(state => state.requestPip);

	const togglePip = () => {
		if (pip) {
			return exitPip();
		}
		return requestPip();
	};

	console.log('PIPButon rerender');

	return (
		<IconButton
			size="medium"
			onClick={togglePip}
			data-testid="icon-pip"
			{...props}
		>
			<Icon fontSize="medium" {...svgIconProps} />
		</IconButton>
	);
};
