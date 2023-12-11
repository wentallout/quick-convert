<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { fade } from 'svelte/transition';
	import type { State } from '$lib/types/converter';
	import UploadSimple from '~icons/ph/upload-simple';
	import LoadingSpinner from '$lib/components/common/LoadingSpinner.svelte';
	export let state: State;

	export let originalFilename: string;

	export let error: string;
</script>

<div class="drop__text">
	{#if state === 'loading'}
		<LoadingSpinner color="var(--color-primary)" width="40" height="40" />
		<p>Loading</p>
	{/if}
	{#if state === 'loaded'}
		<UploadSimple color="var(--color-primary)" width="40" height="40" />
		<div class="drop__desc">
			<button class="btn btn--primary">Choose Files</button>
			<p in:fade>or drag file here to upload</p>
		</div>
	{/if}

	{#if state === 'convert.start'}
		<p in:fade>Converting {originalFilename}</p>
	{/if}
	{#if state === 'convert.done'}
		<p use:confetti in:fade>Done</p>
	{/if}
</div>

{#if error}
	<p class="error" in:fade>{error}</p>
{/if}

<style>
	.drop__text {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		& .drop__desc {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-top: var(--space-2xs);
		}
	}
</style>
