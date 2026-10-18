import { FC } from 'react';

import { useMediaStore } from '../../../context/index.js';
import { useIsAudio } from '../../../hooks/index.js';
import { useBottomControlsStyles } from '../../bottom-controls/useBottomControlsStyles.js';
import { useControlsStyles } from '../../controls/useControlsStyles.js';
import { ProgressBar } from '../../progress-bar/ProgressBar.js';

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
