<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const track = document.querySelector('.horizontal-track') as HTMLElement;
		if (!track) return;

		// Calculate how far to scroll horizontally based on track width
		const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

		const tween = gsap.to(track, {
			x: getScrollAmount,
			ease: 'none',
			scrollTrigger: {
				trigger: '.horizontal-section',
				start: 'top top',
				end: () => `+=${track.scrollWidth - window.innerWidth}`,
				pin: true,
				scrub: 1,
				invalidateOnRefresh: true
			}
		});

		return () => {
			tween.kill();
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<div class="page-wrapper">
	<section class="intro">
		<div class="intro-content">
			<span class="badge">Squad Showcase</span>
			<h1>Ali Suleiman's Selection</h1>
			<p>Scroll down to experience the horizontal squad scroll.</p>
		</div>
	</section>

	<!-- Horizontal Scroll Section -->
	<section class="horizontal-section">
		<div class="horizontal-track">
			<div class="section-title-card">
				<h2>Featured<br />Squad 2026</h2>
				<span>01 / 11</span>
			</div>

			<!-- Player Cards -->
			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/COURTOIS_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="Courtois"
					/>
				</div>
				<div class="player-info">
					<span class="number">1</span>
					<h3>Courtois</h3>
				</div>
			</div>

			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/CUCURELLA_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="Cucurella"
					/>
				</div>
				<div class="player-info">
					<span class="number">2</span>
					<h3>Cucurella</h3>
				</div>
			</div>

			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/HUIJSEN_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="Huijsen"
					/>
				</div>
				<div class="player-info">
					<span class="number">3</span>
					<h3>Huijsen</h3>
				</div>
			</div>

			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/KONATE_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="Konaté"
					/>
				</div>
				<div class="player-info">
					<span class="number">4</span>
					<h3>Konaté</h3>
				</div>
			</div>

			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/TRENT_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="Trent"
					/>
				</div>
				<div class="player-info">
					<span class="number">5</span>
					<h3>Trent</h3>
				</div>
			</div>

			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/CAMAVINGA_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="Camavinga"
					/>
				</div>
				<div class="player-info">
					<span class="number">6</span>
					<h3>Camavinga</h3>
				</div>
			</div>

			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/BERNARDO_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="Bernardo Silva"
					/>
				</div>
				<div class="player-info">
					<span class="number">7</span>
					<h3>Bernardo Silva</h3>
				</div>
			</div>

			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/DIOMANDE_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="Diomande"
					/>
				</div>
				<div class="player-info">
					<span class="number">8</span>
					<h3>Diomande</h3>
				</div>
			</div>

			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/BELLINGHAM_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="Bellingham"
					/>
				</div>
				<div class="player-info">
					<span class="number">9</span>
					<h3>Bellingham</h3>
				</div>
			</div>

			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/GULER_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="Arda Güler"
					/>
				</div>
				<div class="player-info">
					<span class="number">10</span>
					<h3>Arda Güler</h3>
				</div>
			</div>

			<div class="player-card">
				<div class="image-wrapper">
					<img
						src="https://assets.realmadrid.com/is/image/realmadrid/ESPI_CARITA_1500X2000?$Desktop$&fit=wrap&wid=288&hei=384"
						alt="C. Espí"
					/>
				</div>
				<div class="player-info">
					<span class="number">11</span>
					<h3>C. Espí</h3>
				</div>
			</div>
		</div>
	</section>

	<section class="outro">
		<p>Thanks for visiting</p>
	</section>
</div>

<style>
	.page-wrapper {
		color: #f5f5dc;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
		overflow-x: hidden;
	}

	.intro {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 0 20px;
	}

	.intro-content {
		max-width: 600px;
	}

	.badge {
		background: rgba(245, 245, 220, 0.1);
		color: #f5f5dc;
		padding: 6px 14px;
		border-radius: 20px;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 2px;
		border: 1px solid rgba(245, 245, 220, 0.2);
	}

	.intro h1 {
		font-size: 3.5rem;
		margin: 20px 0 10px;
		font-weight: 800;
		letter-spacing: -1px;
	}

	.intro p {
		color: rgba(245, 245, 220, 0.7);
		font-size: 1.2rem;
	}

	/* Horizontal Scroll Styles */
	.horizontal-section {
		height: 100vh;
		display: flex;
		align-items: center;
		overflow: hidden;
		background: rgba(15, 25, 25, 0.4);
	}

	.horizontal-track {
		display: flex;
		gap: 40px;
		padding: 0 5vw;
		will-change: transform;
	}

	.section-title-card {
		min-width: 300px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 40px;
		border-right: 1px solid rgba(245, 245, 220, 0.15);
	}

	.section-title-card h2 {
		font-size: 3rem;
		font-weight: 800;
		line-height: 1.1;
		margin-bottom: 20px;
		letter-spacing: -1px;
	}

	.section-title-card span {
		font-family: monospace;
		font-size: 1.2rem;
		color: rgba(245, 245, 220, 0.6);
	}

	.player-card {
		min-width: 280px;
		max-width: 280px;
		background: rgba(28, 46, 46, 0.7);
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(245, 245, 220, 0.1);
		flex-shrink: 0;
	}

	.image-wrapper {
		aspect-ratio: 3 / 4;
		width: 100%;
		overflow: hidden;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.player-card:hover img {
		transform: scale(1.05);
	}

	.player-info {
		padding: 20px;
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.number {
		font-size: 0.9rem;
		font-weight: 700;
		color: #2f4f4f;
		background: #f5f5dc;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.player-info h3 {
		font-size: 1.2rem;
		font-weight: 600;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.outro {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.8rem;
		color: rgba(245, 245, 220, 0.6);
		letter-spacing: 1px;
	}
</style>
