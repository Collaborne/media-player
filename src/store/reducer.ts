import debug from 'debug';
import mitt from 'mitt';
import {
	Dispatch,
	RefObject,
	useCallback,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react';
import ReactPlayer from 'react-player';

import {
	VideoAction,
	VideoState,
	VideoStateSetter,
	VideoEvents,
} from '../types';

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
	videoContainerRef: RefObject<HTMLDivElement>;
}
const DEBUG_PREFIX = 'useStateReducer';
const log = debug(DEBUG_PREFIX);

export const useStateReducer = ({
	firstInitialState,
	persistedState,
}: UseStateReducerProps): UseStateReducer => {
	const [initialState] = useState(firstInitialState);
	const reactPlayerRef = useRef<ReactPlayer>(null);
	const playPromiseRef = useRef<Promise<void>>();
	const videoContainerRef = useRef<HTMLDivElement>(null);

	const stateReducer = useCallback(
		(state: VideoState, action: VideoAction): VideoState => {
			const fn: VideoStateSetter = videoActions[action.type];
			if (!fn) {
				throw new Error(`Unhandled action type: ${action.type}`);
			}
			const changes = fn(state, action.payload as never);

			log(DEBUG_PREFIX, action.type, action.payload, {
				oldState: state,
				changes,
			});
			const newState = { ...state, ...changes };
			return newState;
		},
		[],
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
				emitter: mitt<VideoEvents>(),
				reactPlayerRef,
				oneTimeStopPoint: null,
				ready: false,
				playing: false,
				playPromiseRef,
				muted: false,
				fullscreen: false,
				hasPlayedOrSeeked: false,
				pip: false,
				videoContainerRef,
				hasPipTriggeredByClick: true,
				showControls: true,
				showPipControls: false,
				didPlayAnimationStart: false,
				didPauseAnimationStart: false,
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
		dispatch,
		videoContainerRef,
	};
};
