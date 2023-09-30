import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material';
import { ComponentType, FC, useRef } from 'react';
import { PiArrowClockwise } from 'react-icons/pi';

import { useMediaStore } from '../../../context';
import { useMediaListener } from '../../../hooks';
import { useOnHoveredControlElement } from '../../../hooks/use-on-hovered-element';
import { SECONDS_TO_SKIP } from '../../../utils/constants';

interface FwdButtonProps extends IconButtonProps {
	skipSeconds?: number;
	Icon?: ComponentType<SvgIconProps>;
	svgIconProps?: SvgIconProps;
}

/**
 * @category React Component
 * @category UI Controls
 */
export const FwdButton: FC<FwdButtonProps> = ({
	Icon = PiArrowClockwise,
	skipSeconds = SECONDS_TO_SKIP,
	svgIconProps,
	...props
}) => {
	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();
	const listener = useMediaStore(state => state.getListener)();
	const currentTimeRef = useRef(0);
	const setCurrentTime = useMediaStore(state => state.setCurrentTime);
	const onFwd = () => setCurrentTime(currentTimeRef.current + skipSeconds);

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
			onClick={onFwd}
			data-testid="icon-fwd"
			{...props}
		>
			<Icon fontSize="medium" {...svgIconProps} />
		</IconButton>
	);
};
