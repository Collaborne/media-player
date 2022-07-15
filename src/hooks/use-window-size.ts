import { useEffect } from 'react';

import { useRafState } from './use-raf-state';
import { Size } from './use-size';

export const useWindowSize = (): Size | undefined => {
	const [state, setState] = useRafState<Size>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const handler = () =>
			setState({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		window.addEventListener('resize', handler);
		return () => {
			window.removeEventListener('resize', handler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return state;
};
