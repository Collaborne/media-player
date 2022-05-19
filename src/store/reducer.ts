import mitt from 'mitt';
import {
	useState,
	useCallback,
	useRef,
	useReducer,
	Dispatch,
	MutableRefObject,
} from 'react';
import { BaseReactPlayerProps } from 'react-player/base';
import { VideoAction, VideoState, VideoStateSetter } from '../types';
import { videoActions } from './actions';

interface UseStateReducerProps {
	firstInitialState: VideoState;
	persistedState?: VideoState;
}
interface UseStateReducer {
	state: VideoState;
	initialState: VideoState;
	videoRef: MutableRefObject<BaseReactPlayerProps | undefined>;
	dispatch: Dispatch<VideoAction>;
}

export const useStateReducer = ({
	firstInitialState,
	persistedState,
}: UseStateReducerProps): UseStateReducer => {
	const [initialState] = useState(firstInitialState);
	const videoRef = useRef<BaseReactPlayerProps>();
	const playPromiseRef = useRef<Promise<void>>();

	// Store the user's last "activity" (including mousemove over player) within a ref,
	// so that state re-renders are not triggered every mousemove.
	const lastActivityRef = useRef<number>();
	const markActivity = useCallback(() => {
		if (lastActivityRef) {
			lastActivityRef.current = Date.now();
		}
	}, []);
	const stateReducer = (state: VideoState, action: VideoAction): VideoState => {
		const fn: VideoStateSetter = videoActions[action.type];
		if (!fn) {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
		const changes = fn(state, action.payload);

		const newState = { ...state, ...changes };

		// Non-private actions mark new activity date.
		if (action.type.charAt(0) !== '_') {
			markActivity();
		}
		return newState;
	};

	const initialReducerState: VideoState = {
		...{
			currentTime: 0,
			currentRelativeTime: 0,
			playbackRate: 1,
			startTime: 0,
			endTime: initialState.duration || 0,
			duration: 0,
			volume: 1,
			lastActivityRef,
			emitter: mitt(),
			videoRef,
			oneTimeStopPoint: null,
			ready: false,
			loop: false,
			playing: false,
			playPromiseRef,
			muted: false,
			fullscreen: false,
		},
		...persistedState,
		...initialState,
	};

	const [state, dispatch] = useReducer(stateReducer, initialReducerState);

	return {
		state,
		initialState,
		videoRef,
		dispatch,
	};
};
