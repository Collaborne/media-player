import { IconButton } from '@mui/material';
import { PiArrowsInLineVertical, PiArrowsVertical } from 'react-icons/pi';

import { useOnHoveredControlElement } from '../../../hooks';

export interface CollapseIconButtonProps {
	isCollapsed?: boolean;
	onToggleCollapse: VoidFunction;
}

/**
 * @category React Component
 * @category UI Controls
 */
export function CollapseIconButton(props: CollapseIconButtonProps) {
	const { onMouseEnter, onMouseLeave } = useOnHoveredControlElement();

	const Icon = !props.isCollapsed ? PiArrowsInLineVertical : PiArrowsVertical;

	return (
		<IconButton
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={props.onToggleCollapse}
			size="medium"
		>
			<Icon fontSize="medium" />
		</IconButton>
	);
}
