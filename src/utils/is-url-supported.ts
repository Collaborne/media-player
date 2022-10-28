// These extensions are officially supported by ReactPlayer
export const AUDIO_EXTENSIONS =
	/\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
export const VIDEO_EXTENSIONS =
	/\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;

export const isAudio = (url: string) => AUDIO_EXTENSIONS.test(url);
export const isVideo = (url: string) => VIDEO_EXTENSIONS.test(url);

export const isUrlSupported = (url: string) => isAudio(url) || isVideo(url);
