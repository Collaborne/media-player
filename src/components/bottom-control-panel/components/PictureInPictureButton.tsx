import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useVideo } from '../../../hooks';
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
	const { api, fullScreenApi } = useVideo();
	const onPip = () => {
		if (fullScreenApi?.isFullscreen) {
			fullScreenApi?.exitFullscreen();
		}
		api?.setHasPipTriggeredByClick?.(true);
		if (api?.getPictureInPicture?.()) {
			return api?.exitPip?.();
		}
		// Calling with a delay pip => otherwise styles and position for pip are inconsistent
		return setTimeout(() => api?.requestPip?.(), 10);
	};

	return (
		<IconButton size="medium" onClick={onPip} data-testid="icon-pip" {...props}>
			<Icon fontSize="medium" {...svgIconProps} />
		</IconButton>
	);
};
