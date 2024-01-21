<script lang="ts">
	import type { State } from '$lib/types/converter';

	export let progress: number;
	export let state: State;

	export let originalFilename: string;
</script>

<div class="progress" class:hidden={progress === 0} class:success={progress === 100}>
	<div class="progress__text">
		{#if state === 'convert.start'}
			<p>{originalFilename}</p>
		{/if}
	</div>
	<div class="progress__bar" style:--progress="{progress}%">
		<p class="percentage">
			{progress.toFixed(0)}%
		</p>
	</div>
</div>

<style>
	.progress {
		width: 100vw;
		height: 24px;
		position: fixed;
		bottom: 0;
		left: 0;
		font-weight: 600;
		background-color: black;
		color: var(--color-bg-elevated);
		transition: all linear 0.3s;
		overflow: hidden;
		& .progress__bar {
			width: var(--progress);
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			background: var(--color-primary);
			z-index: -1;
		}
	}

	.progress__text {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: var(--space-3xs);
	}

	.hidden {
		opacity: 0;
	}

	.success {
		background: var(--color-success);
		color: var(--color-text);
	}

	.percentage {
		position: absolute;
		left: 0;
		top: 0;
	}
</style>
