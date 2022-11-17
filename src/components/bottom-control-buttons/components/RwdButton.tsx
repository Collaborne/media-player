import { Replay10Outlined } from '@mui/icons-material';
import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC, useRef } from 'react';

import { useMediaStore } from '../../../context/MediaProvider';
import { useMediaListener } from '../../../hooks';
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

	const listener = useMediaStore(state => state.getListener)();
	const currentTimeRef = useRef(0);
	const setCurrentTime = useMediaStore(state => state.setCurrentTime);

	const onRwd = () => setCurrentTime(currentTimeRef.current - skipSeconds);

	useMediaListener(
		'timeupdate',
		e => (currentTimeRef.current = e.seconds),
		listener,
	);

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
