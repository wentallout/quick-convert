<script lang="ts">
	import type { State } from '$lib/types/converter';

	export let progress: number;
	export let state: State;

	export let originalFilename: string;
</script>

<div class="progress-bar" class:hidden={progress === 0} class:success={progress === 100}>
	<div class="progress" style:--progress="{progress}%">
		<div class="progress__text">
			{progress.toFixed(0)}%
			{#if state === 'convert.start'}
				<span>Converting {originalFilename}</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.progress-bar {
		--progress-bar-clr: var(--color-primary);

		width: 100vw;
		height: fit-content;
		position: fixed;
		bottom: 0;
		left: 0;
		font-weight: 600;
		background-color: transparent;
		color: var(--color-bg-elevated);
		transition: all linear 0.3s;
		overflow: hidden;
		& .progress {
			width: var(--progress);
			height: fit-content;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			background: var(--progress-bar-clr);
		}
	}

	.progress__text {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: var(--space-3xs);
	}

	.hidden {
		opacity: 0;
	}

	.success {
		--progress-bar-clr: yellow;
		color: var(--color-text);
	}
</style>
