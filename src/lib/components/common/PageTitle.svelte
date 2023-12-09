<script lang="ts">
	export let title: string;
	export let desc: string = '';
</script>

<div class="ptitle">
	<h1>{title}</h1>

	{#if desc !== ''}
		<p>{desc}</p>
	{/if}
</div>

<style>
	.ptitle {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin-bottom: var(--space-xl);
	}
</style>
