export {};
/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

// TODO: Fix when deciding to use youtube links
// TS for only media player that plays media files
declare module 'react-player' {
	export default interface ReactPlayer extends ReactPlayer {
		getInternalPlayer(): HTMLMediaElement | null;
		get wrapper(): HTMLDivElement;
	}
}
