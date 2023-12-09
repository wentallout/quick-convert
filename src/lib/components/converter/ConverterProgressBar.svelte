<script lang="ts">
	export let progress: number;
</script>

<div class="progress-bar" class:hidden={progress === 0} class:success={progress === 100}>
	<div class="progress" style:--progress="{progress}%">
		<div class="">
			{progress.toFixed(0)}%
		</div>
	</div>
</div>

<style>
	.progress-bar {
		--progress-bar-clr: var(--color-primary);

		width: 100%;
		height: 24px;
		position: fixed;
		top: 0;
		left: 0;
		font-weight: 600;
		background-color: var(--color-bg-elevated);
		border-radius: var(--border-radius);
		color: var(--color-bg-elevated);
		transition: linear 0.3s;
		overflow: hidden;
		& .progress {
			width: var(--progress);
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			display: grid;
			place-content: center;
			background: var(--progress-bar-clr);
		}
	}

	.hidden {
		opacity: 0;
	}

	.success {
		--progress-bar-clr: yellow;
	}
</style>
