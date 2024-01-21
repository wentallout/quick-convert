<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { FFmpeg } from '@ffmpeg/ffmpeg';
	import { onMount } from 'svelte';
	import {
		type State,
		type DownloadableFile,
		type FileCategory,
		ffmpegSupportedFiletypes
	} from '$lib/types/converter';
	import ConverterProgressBar from '$lib/components/converter/ConverterProgressBar.svelte';
	import ConverterState from '$lib/components/converter/ConverterState.svelte';
	import ConverterDownloader from '$lib/components/converter/ConverterDownloader.svelte';
	import { fade } from 'svelte/transition';
	import ConverterConsole from '$lib/components/converter/ConverterConsole.svelte';

	import { accordion } from '$lib/actions/accordion';

	let supportedFiletypes: string[];

	export let fileCategory: FileCategory;

	switch (fileCategory) {
		case 'audio':
			supportedFiletypes = ffmpegSupportedFiletypes.audio;
			break;
		case 'image':
			supportedFiletypes = ffmpegSupportedFiletypes.image;
			break;
		case 'video':
			supportedFiletypes = ffmpegSupportedFiletypes.video;
			break;
	}

	let showStep2: boolean;
	let showStep3: boolean;

	let state: State = 'loading';
	let inputFiletypeValue: string;
	let outputFiletypeValue: string;

	let error = '';
	let ffmpeg: FFmpeg;

	let downloadableFiles: DownloadableFile[] = [];

	let progress = tweened(0);
	let ffmpegInput: string;
	let ffmpegOutput: string;

	$: ffmpegInput = `input.${inputFiletypeValue}`;
	$: ffmpegOutput = `output.${outputFiletypeValue}`;

	$: inputFiletypeValue;
	$: outputFiletypeValue;

	let originalFilename: string = 'original';

	let filesToConvert: File[] = new Array<File>();
	$: filesToConvert;

	let consoleMessage: string;

	onMount(() => {
		loadFFmpeg();
	});

	async function loadFFmpeg() {
		const baseUrl = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm';

		ffmpeg = new FFmpeg();

		ffmpeg.on('progress', (event) => {
			$progress = event.progress * 100;
		});

		ffmpeg.on('log', ({ message }) => {
			consoleMessage = message;
			console.log(message);
		});

		await ffmpeg.load({
			coreURL: `${baseUrl}/ffmpeg-core.js`,
			wasmURL: `${baseUrl}/ffmpeg-core.wasm`
		});

		state = 'loaded';
	}

	async function readFile(file: File): Promise<Uint8Array> {
		return new Promise<Uint8Array>((resolve) => {
			const fileReader = new FileReader();

			fileReader.onload = () => {
				const { result } = fileReader;

				if (result instanceof ArrayBuffer) {
					resolve(new Uint8Array(result));
				}
			};

			fileReader.onerror = () => {
				error = 'Could not read file';
			};

			fileReader.readAsArrayBuffer(file);
		}).then((arrayBuffer) => {
			originalFilename = file.name;

			inputFiletypeValue = file.type.split('/')[1];

			return arrayBuffer;
		});
	}

	async function convertFile(file: File) {
		state = 'convert.start';
		const videoData = await readFile(file);

		await ffmpeg.writeFile(ffmpegInput, videoData);
		await ffmpeg.exec(['-i', ffmpegInput, ffmpegOutput]);

		const data = await ffmpeg.readFile(ffmpegOutput);
		state = 'convert.done';

		setTimeout(() => {
			state = 'loaded';
		}, 1000);

		return data as Uint8Array;
	}

	function createDownloadLink(name: string, data: Uint8Array) {
		let link = URL.createObjectURL(
			new Blob([data.buffer], {
				type: `${fileCategory}/${outputFiletypeValue}`
			})
		);

		let downloadableFile: DownloadableFile = {
			downloadLink: link,
			downloadName: `${name}-converted.${outputFiletypeValue}`
		};

		downloadableFiles = [...downloadableFiles, downloadableFile];
		showStep3 = true;
	}

	function addToQueue(files: File[]) {
		filesToConvert = [...filesToConvert, ...files];
	}

	function removeFromQueue(file: File) {
		filesToConvert = filesToConvert.filter((file) => file != file);
		console.log('remove this file', file);
	}

	async function handleClick(event: MouseEvent) {
		const input = document.createElement('input');
		input.type = 'file';

		input.accept = fileCategory + '/*';

		input.multiple = true;

		input.addEventListener('change', async (event) => {
			const inputElement = event.target as HTMLInputElement;

			if (inputElement.files) {
				const files = Array.from(inputElement.files);
				addToQueue(files);
				showStep2 = true;
			}
		});
		input.click();
	}

	async function handleDrop(event: DragEvent) {
		if (!event.dataTransfer) return;

		const files = Array.from(event.dataTransfer.files);

		if (files.length === 0) {
			error = 'No file detected';
		}

		addToQueue(files);
		showStep2 = true;
	}

	async function handleConvert() {
		if (filesToConvert === null || filesToConvert.length === 0) {
			throw new Error('filesToConvert is null or empty');
		}

		for (let file of filesToConvert) {
			let data = await convertFile(file);

			if (data) {
				createDownloadLink(file.name, data);
			}
		}
		filesToConvert = [];
	}
</script>

<div class="wrapper">
	<div class="file-and-drop">
		<button
			disabled={state === 'convert.start' || state === 'loading'}
			class="drop"
			data-state={state}
			on:click={handleClick}
			on:drop|preventDefault={handleDrop}
			on:dragover|preventDefault={() => {}}>
			<ConverterState {error} {state} {originalFilename} />
		</button>

		{#if filesToConvert.length !== 0}
			<div class="files">
				<h2>Files to convert</h2>
				<ul>
					{#each filesToConvert as file}
						<li>{file.name}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>

	{#if showStep2}
		<section use:accordion={showStep2}>
			<h2>Your output</h2>
			<div class="convert__input">
				<input
					list="file-types"
					class="input input__custom"
					bind:value={outputFiletypeValue}
					type="text" />
				<datalist id="file-types">
					{#each supportedFiletypes as type}
						<option value={type}>{type}</option>
					{/each}
				</datalist>
				<button class="btn btn--primary" on:click={handleConvert}>Convert</button>
			</div>

			<div class="type-list">
				{#each supportedFiletypes as type}
					<button
						on:click={() => {
							outputFiletypeValue = type;
						}}
						class="btn btn--s btn--outline">
						{type}
					</button>
				{/each}
			</div>
		</section>
	{/if}

	<ConverterConsole {consoleMessage} />

	{#if showStep3}
		<section in:fade class="">
			<h2>Converted files</h2>
			<ConverterDownloader {downloadableFiles} />
		</section>
	{/if}
</div>
<ConverterProgressBar {state} progress={$progress} {originalFilename} />

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xl);
	}

	.file-and-drop {
		--min: 15ch;
		--gap: var(--space-l);

		display: grid;
		grid-gap: var(--gap);
		/* min() with 100% prevents overflow
  in extra narrow spaces */
		grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
	}

	.drop {
		width: 100%;
		height: 30vh;
		display: grid;
		place-content: center;
		border: 1px dashed var(--color-text);
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: var(--transition);

		background-color: var(--color-bg-elevated);
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");

		&:hover {
			border: 1px solid var(--color-primary-hover);
		}

		&:disabled {
			background: transparent;
			border: 1px solid var(--color-text-quaternary);
			cursor: not-allowed;
		}
	}

	.type-list {
		width: 100%;
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
		justify-content: start;
		gap: var(--space-2xs);
	}

	.convert__input {
		display: flex;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--space-2xs);
		margin-bottom: var(--space-l);
	}

	.input__custom {
		text-align: center;
		max-width: 80px;
	}

	.files {
		display: flex;
		flex-direction: column;

		& ul {
			display: flex;
			flex-direction: column;
			gap: var(--space-3xs);
		}
	}
</style>
