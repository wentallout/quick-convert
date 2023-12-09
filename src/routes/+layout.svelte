<script lang="ts">
	import '$lib/styles/global.css';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/NavbarDesktop.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		min-height: 100vh;
	}
</style>
