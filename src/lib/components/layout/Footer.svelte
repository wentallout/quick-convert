<footer>
	<div class="footer u-container">
		<ul class="footer__col">
			<h5 class="footer__title">QuickConvert</h5>
			<li class="footer__content">
				<p>
					Straightforward converter for your media files. We support most of the popular video,
					audio and image files
				</p>
			</li>
		</ul>
		<ul class="footer__col">
			<h5 class="footer__title">How does this work?</h5>
			<li class="footer__content">
				<p>
					Our project leverages the versatile FFmpeg library to bring seamless file conversion
					capabilities to your fingertips.
				</p>
			</li>
		</ul>

		<ul class="footer__col">
			<h5 class="footer__title">Legal</h5>
			<li class="footer__content">
				<a href="/privacy">
					<p>Privacy Policy</p>
				</a>
			</li>
		</ul>

		<ul class="footer__col">
			<h5 class="footer__title">Contact</h5>

			<li class="footer__content">
				<a href="https://wentallout.io.vn">
					<p>Nguyen Dang Khoa</p>
				</a>
			</li>

			<li class="footer__content">
				<a href="https://wentallout.io.vn">
					<p>wentallout.io.vn</p>
				</a>
			</li>
			<li class="footer__content">
				<a href="https://github.com/wentallout">
					<p>GitHub</p>
				</a>
			</li>
			<li class="footer__content">
				<a href="https://www.linkedin.com/in/wentallout/">
					<p>LinkedIn</p>
				</a>
			</li>
		</ul>
	</div>
	<div class="footer__end u-container">© 2023 wentallout</div>
</footer>

<style>
	footer {
		background-color: black;
		margin-top: var(--space-2xl);
	}

	.footer__end {
		color: white;
		width: 100%;
	}

	.footer {
		--min: 25ch;
		--gap: var(--grid-gutter);

		display: grid;
		grid-gap: var(--gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));

		color: white;

		& .footer__col {
			display: flex;
			flex-direction: column;
			gap: var(--space-2xs);
			padding-top: var(--space-m);
			padding-bottom: var(--space-m);

			& .footer__title {
				font-size: var(--font-size-s);
				margin-bottom: var(--space-2xs);
				font-weight: 600;
			}
		}
	}
</style>
