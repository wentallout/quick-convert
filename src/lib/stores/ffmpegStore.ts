import { onMount } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import { FFmpeg } from '@ffmpeg/ffmpeg';
let ffmpeg: FFmpeg;

export const ffmpegStore: Writable<FFmpeg> = writable();




export const 

async function loadFFmpeg() {
	const baseUrl = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm';

	ffmpeg = new FFmpeg();

	ffmpegStore.set(ffmpeg);

	ffmpeg.on('progress', (event) => {
		$progress = event.progress * 100;
	});

	ffmpeg.on('log', ({ message }) => {
		console.log(message);
	});

	await ffmpeg.load({
		coreURL: `${baseUrl}/ffmpeg-core.js`,
		wasmURL: `${baseUrl}/ffmpeg-core.wasm`
	});

	state = 'loaded';
}

onMount(() => {
	loadFFmpeg();
});
