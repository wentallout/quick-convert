export type State = 'loading' | 'loaded' | 'convert.start' | 'convert.error' | 'convert.done';

export type DownloadableFile = {
	downloadLink: string;
	downloadName: string;
};

export type FileCategory = 'audio' | 'video' | 'image';

//sorted popular first
export const ffmpegSupportedFiletypes = {
	audio: [
		'mp3',
		'aac',
		'flac',
		'wav',
		'm4a',
		'ogg',
		'alac',
		'ac3',
		'wma',
		'ape',
		'amr',
		'dts',
		'opus',
		'pcm',
		'mpc',
		'tak',
		'truehd',
		'tta',
		'wv',
		'aiff'
	],
	video: [
		'mp4',
		'mkv',
		'avi',
		'mov',
		'mpeg',
		'webm',
		'wmv',
		'flv',
		'3gp',
		'ogv',
		'h264',
		'hevc',
		'mjpeg',
		'f4v',
		'mjpg',
		'h263',
		'vc1',
		// 'asf',
		// 'dv',
		'nut'
	],
	image: [
		'jpeg',
		'png',
		'gif',
		'bmp',
		'jpg',
		'webp',
		'tiff',
		'ico',
		'svg',
		'pdf',
		'pgm',
		'ppm',
		'pgmyuv',
		'pam',
		'dpx',
		'exr',
		'fits',
		'j2k',
		'jp2',
		'pcx',
		'psd',
		'sgi',
		'tga',
		'dds'
	]
};
