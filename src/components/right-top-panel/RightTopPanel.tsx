import { FC } from 'react';

export interface RightTopPanelProps {
	onDownload: VoidFunction;
	onDelete: VoidFunction;
	onCover: VoidFunction;
}

export const RightTopPanel: FC<RightTopPanelProps> = () => {
	return <div>RightTopPanel</div>;
};
