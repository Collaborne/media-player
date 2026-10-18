import { FC, ReactNode } from 'react';

import { PipControls as PipControlsComponent } from '../components/pip-controls/PipControls.js';

import { PIPControlsContext } from './pipControls.js';

interface PIPContextProviderProps {
	PIPControls?: FC;
	children: ReactNode;
}
/** Keep highlights in a context to distribute them to UI Controls
 * @category ContextProvider
 */
export const PIPContextProvider: FC<PIPContextProviderProps> = ({
	PIPControls = PipControlsComponent,
	children,
}) => {
	return (
		<PIPControlsContext.Provider value={{ PIPControls }}>
			{children}
		</PIPControlsContext.Provider>
	);
};
