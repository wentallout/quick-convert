<script lang="ts">
	export let consoleMessage: string = '';
	import { fade } from 'svelte/transition';
</script>

{#if consoleMessage !== 'Aborted()'}
	<div in:fade class="console">
		{consoleMessage}
	</div>
{/if}

<style>
	.console {
		width: 100%;
		height: fit-content;
		background-color: black;
		color: white;
		font-family: monospace;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
