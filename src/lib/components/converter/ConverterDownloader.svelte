<script lang="ts">
	import type { DownloadableFile } from '$lib/types/converter';

	import File from '~icons/ph/file';

	export let downloadableFiles: DownloadableFile[] = [];
</script>

<div class="download">
	{#each downloadableFiles as file}
		<a class="file" download={file.downloadName} href={file.downloadLink}>
			<div class="file__icon">
				<File width="24" height="24" />
			</div>
			<p class="file__name">
				{file.downloadName}
			</p>
		</a>
	{/each}
</div>

<style>
	.download {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		gap: var(--space-xs);
	}

	.file__icon {
		background-color: var(--color-bg-elevated);
		padding: var(--space-2xs) var(--space-2xs);
	}

	.file {
		display: flex;
		align-items: center;
		gap: var(--space-2xs);

		border: 1px solid black;
		overflow: hidden;
		border-radius: var(--border-radius);
		width: fit-content;
	}

	.file__name {
		text-decoration: none;
		padding-right: var(--space-2xs);
	}
</style>
