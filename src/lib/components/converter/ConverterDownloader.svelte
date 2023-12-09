<script lang="ts">
	import type { DownloadableFile } from '$lib/types/converter';

	export let downloadableFiles: DownloadableFile[] = [];
</script>

<div class="download">
	{#each downloadableFiles as file}
		<a class="download__file" download={file.downloadName} href={file.downloadLink}>
			<p>
				{file.downloadName}
			</p>
		</a>
	{/each}
</div>

<style>
	.download {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.download__file {
		border: 1px solid black;
		border-radius: var(--border-radius);
	}
</style>
