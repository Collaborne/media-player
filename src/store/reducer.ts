import mitt from 'mitt';
import {
	Dispatch,
	MutableRefObject,
	RefObject,
	useCallback,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react';
import ReactPlayer from 'react-player';

import { VideoAction, VideoState, VideoStateSetter } from '../types';

import { videoActions } from './actions';

interface UseStateReducerProps {
	firstInitialState: Partial<VideoState>;
	persistedState?: VideoState;
}
interface UseStateReducer {
	state: VideoState;
	initialState: Partial<VideoState>;
	reactPlayerRef: RefObject<ReactPlayer>;
	dispatch: Dispatch<VideoAction>;
	lastActivityRef: MutableRefObject<number | undefined>;
	markActivity: VoidFunction;
	videoContainerRef: RefObject<HTMLDivElement>;
}

export const useStateReducer = ({
	firstInitialState,
	persistedState,
}: UseStateReducerProps): UseStateReducer => {
	const [initialState] = useState(firstInitialState);
	const reactPlayerRef = useRef<ReactPlayer>(null);
	const playPromiseRef = useRef<Promise<void>>();
	const videoContainerRef = useRef<HTMLDivElement>(null);

	// Store the user's last "activity" (including mousemove over player) within a ref,
	// so that state re-renders are not triggered every mousemove.
	const lastActivityRef = useRef<number>();
	const markActivity = useCallback(() => {
		if (lastActivityRef) {
			lastActivityRef.current = Date.now();
		}
	}, [lastActivityRef]);
	const stateReducer = useCallback(
		(state: VideoState, action: VideoAction): VideoState => {
			const fn: VideoStateSetter = videoActions[action.type];
			if (!fn) {
				throw new Error(`Unhandled action type: ${action.type}`);
			}
			const changes = fn(state, action.payload as never);

			const newState = { ...state, ...changes };

			// Non-private actions mark new activity date.
			if (action.type.charAt(0) !== '_') {
				markActivity();
			}
			return newState;
		},
		[markActivity],
	);

	const initialReducerState: VideoState = useMemo(
		() => ({
			...{
				currentTime: 0,
				currentRelativeTime: 0,
				playbackRate: 1,
				startTime: 0,
				endTime: initialState.duration || 0,
				duration: 0,
				volume: 1,
				lastActivityRef: null,
				emitter: mitt(),
				reactPlayerRef,
				oneTimeStopPoint: null,
				ready: false,
				loop: false,
				playing: false,
				playPromiseRef,
				muted: false,
				fullscreen: false,
				hasPlayedOrSeeked: false,
				pip: false,
				videoContainerRef,
				hasPipTriggeredByClick: true,
				highlights: [],
			},
			...persistedState,
			...initialState,
		}),
		[initialState, persistedState, reactPlayerRef],
	);

	const [state, dispatch] = useReducer(stateReducer, initialReducerState);

	return {
		state,
		initialState,
		reactPlayerRef,
		lastActivityRef,
		dispatch,
		markActivity,
		videoContainerRef,
	};
};
