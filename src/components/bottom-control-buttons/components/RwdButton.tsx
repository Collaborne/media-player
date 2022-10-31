import { Replay10Outlined } from '@mui/icons-material';
import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC } from 'react';

import { useMediaStore } from '../../../context/MediaProvider';
import { useOnHoveredControlElement } from '../../../hooks/use-on-hovered-element';
import { SECONDS_TO_SKIP } from '../../../utils/constants';

interface RwdButtonProps extends IconButtonProps {
	skipSeconds?: number;
	Icon?: ComponentType<SvgIconProps>;
	svgIconProps?: SvgIconProps;
}

/**
 * @category React Component
 * @category UI Controls
 */
export const RwdButton: FC<RwdButtonProps> = ({
	Icon = Replay10Outlined,
	skipSeconds = SECONDS_TO_SKIP,
	svgIconProps,
	...props
}) => {
	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();

	const [currentTime, setCurrentTime] = useMediaStore(state => [
		state.currentTime,
		state.setCurrentTime,
	]);

	const onRwd = () => setCurrentTime(currentTime - skipSeconds);

	return (
		<IconButton
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			size="medium"
			onClick={onRwd}
			data-testid="icon-rwd"
			{...props}
		>
			<Icon fontSize="medium" {...svgIconProps} />
		</IconButton>
	);
};
