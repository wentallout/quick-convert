<script lang="ts">
	import { page } from '$app/stores';

	let path: string;

	$: path = $page.url.pathname;
</script>

<nav>
	<ul class="nav u-container">
		<li class="nav__item">
			<a class="nav__link" href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				QuickConvert</a>
		</li>

		<li class="nav__item">
			<a
				class="nav__link"
				href="/video"
				aria-current={$page.url.pathname === '/video' ? 'page' : undefined}>
				Video
			</a>
		</li>

		<li class="nav__item">
			<a
				class="nav__link"
				href="/audio"
				aria-current={$page.url.pathname === '/audio' ? 'page' : undefined}>
				Audio
			</a>
		</li>

		<li class="nav__item">
			<a
				class="nav__link"
				href="/image"
				aria-current={$page.url.pathname === '/image' ? 'page' : undefined}>
				Image
			</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		width: 100%;
		background-color: var(--color-bg-elevated);
		margin-bottom: var(--space-xl);
	}

	.nav {
		color: white;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.nav__item {
		flex-grow: 1;
	}

	.nav__link {
		padding: var(--space-xs);
		display: block;
		width: 100%;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		border-bottom: 1px solid transparent;
		color: var(--color-text);

		&[aria-current='page'] {
			color: var(--color-primary-active);
			border-bottom: 1px solid var(--color-primary-active);
			font-weight: 600;
		}
	}
</style>
