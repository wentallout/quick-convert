<script>
	import PageTitle from '$lib/components/common/PageTitle.svelte';
	import Converter from '$lib/components/converter/Converter.svelte';
</script>

<section class="u-container">
	<PageTitle
		title="Video Converter"
		desc="Supported audio files: mp4, mkv, avi, mov, flv, wmv, webm, 3gp, mpeg, ogv" />

	<Converter fileCategory="video" />
</section>
