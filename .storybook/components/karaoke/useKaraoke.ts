import { TimeUpdateEvent, VideoContext } from '../../../src';
import { Decoration } from '@remirror/pm/view';
import { MutableRefObject, RefObject, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';

import { TimestampsByUrlRef } from '../components/SetTimestamps';

import { useTranscript } from './useTranscript';
import { useVideoContexts } from './useVideoContexts';

export interface UseKaraokeParams {
	editorRef: RefObject<EditorRef>;
	timestampsByUrlRef: MutableRefObject<TimestampsByUrlRef | null>;
}

export interface UseKaraokeResponse {
	setVideoContext: (context: VideoContext, url?: string) => void;
	getTimestampsStyle: () => Decoration[];
	handleTranscriptMarkClick: (time: Timestamp) => void;
}

const DECORATION_SPEC = {
	inclusiveStart: true,
	inclusiveEnd: true,
};

const useStyles = makeStyles()(theme => ({
	active: {
		backgroundColor: `${theme.palette.primary.light} !important`,
		color: theme.palette.grey[900],
		borderRadius: theme.spacing(0.5),
		height: theme.spacing(3.5),
	},
}));

export function useKaraoke({
	editorRef,
	timestampsByUrlRef,
}: UseKaraokeParams): UseKaraokeResponse {
	const { classes } = useStyles();

	const { getActiveTimestamps, setActiveTimestamp } =
		useTranscript(timestampsByUrlRef);

	const getTimeUpdateHandler = useCallback(
		(url: string) => (e: TimeUpdateEvent) => {
			setActiveTimestamp(e.seconds, url);
			editorRef.current?.forceUpdate();
		},
		[editorRef, setActiveTimestamp],
	);

	const { setVideoContext, setVideoTime } =
		useVideoContexts(getTimeUpdateHandler);

	const getTimestampsStyle = useCallback(() => {
		const activeTimestamps = getActiveTimestamps();

		return activeTimestamps.map(({ from, to }) =>
			Decoration.inline(from, to, { class: classes.active }, DECORATION_SPEC),
		);
	}, [classes.active, getActiveTimestamps]);

	return {
		setVideoContext,
		getTimestampsStyle,
		handleTranscriptMarkClick: setVideoTime,
	};
}
