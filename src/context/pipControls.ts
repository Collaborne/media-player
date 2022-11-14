import { createContext, FC } from 'react';

export interface PIPControlsContext {
	PIPControls: FC;
}
/** Context for storing `PIPControls` to distribute it to UI Controls for PIP
 * @category React Context
 */
export const PIPControlsContext = createContext<PIPControlsContext | null>(
	null,
);
