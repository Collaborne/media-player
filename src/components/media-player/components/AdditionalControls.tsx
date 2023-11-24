import { FC } from 'react';

import { useMediaStore } from '../../../context';
import { useIsAudio } from '../../../hooks';
import { useBottomControlsStyles } from '../../bottom-controls/useBottomControlsStyles';
import { useControlsStyles } from '../../controls/useControlsStyles';
import { ProgressBar } from '../../progress-bar/ProgressBar';

export interface AdditionalControlProps {
	className?: string;
}

/**
 * Components that adds specific Controls usage for `<MediaPlayer />`
 * @category React Component
 * @category UI Controls
 */
export const AdditionalControls: FC<AdditionalControlProps> = ({
	className,
}) => {
	const isAudio = useIsAudio();
	const showControls = useMediaStore(state => state.showControls);

	// Controls styles
	const { classes, cx } = useControlsStyles();
	const classNameControls = cx(classes.controls, className);
	const {
		classes: { bottomControls },
	} = useBottomControlsStyles({ isAudio });

	if (!showControls && !isAudio) {
		return (
			<div className={classNameControls}>
				<div className={bottomControls}>
					<ProgressBar />
				</div>
			</div>
		);
	}

	return null;
};
