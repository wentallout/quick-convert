<script>
	import PageTitle from '$lib/components/common/PageTitle.svelte';
	import Converter from '$lib/components/converter/Converter.svelte';
</script>

<section class="u-container">
	<PageTitle
		title="Audio Converter"
		desc="Supported audio files: mp3, aac, wav, flac, ogg, wma, aiff, m4a, ac3" />

	<Converter fileCategory="audio" />
</section>
