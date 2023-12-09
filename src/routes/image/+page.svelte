<script>
	import PageTitle from '$lib/components/common/PageTitle.svelte';
	import Converter from '$lib/components/converter/Converter.svelte';
</script>

<section class="u-container">
	<PageTitle
		title="Image Converter"
		desc="Supported files: jpeg, png, gif, bmp, tiff, webp, ico, pdf, svg" />

	<Converter fileCategory="image" />
</section>
