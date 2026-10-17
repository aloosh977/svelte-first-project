<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	let { data } = $props();
	let players = $derived(data.players);

	let showcase: HTMLElement;
	let viewport: HTMLDivElement;
	let track: HTMLDivElement;
	let active = $state(0);
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const media = gsap.matchMedia();
		media.add(
			'(min-width: 768px) and (prefers-reduced-motion: no-preference)',
			() => {
				active = 0;
				gsap.to(track, {
					y: () => -(track.scrollHeight - viewport.clientHeight),
					ease: 'none',
					onUpdate() {
						const distance = track.scrollHeight - viewport.clientHeight;
						const offset = -(gsap.getProperty(track, 'y') as number);
						active =
							distance > 0
								? Math.min(
										players.length - 1,
										Math.round((offset / distance) * (players.length - 1))
									)
								: 0;
					},
					scrollTrigger: {
						trigger: showcase,
						start: 'top top',
						end: () => `+=${(players.length - 1) * viewport.clientHeight}`,
						pin: true,
						scrub: 0.6,
						invalidateOnRefresh: true
					}
				});
			},
			showcase
		);
		return () => media.revert();
	});
</script>

<svelte:head>
	<title>Ali Suleiman's Selection — Squad Showcase</title>
	<meta
		name="description"
		content="Explore Ali Suleiman's featured squad in an interactive player showcase."
	/>
</svelte:head>

<div class="page-wrapper">
	<section class="intro">
		<span class="eyebrow">Squad Showcase / 2026</span>
		<h1>Ali Suleiman's<br />Selection</h1>
		<p>Eleven players. One vision.</p>
		<a href="#squad">Explore the squad ↓</a>
	</section>
	<section id="squad" class="showcase" bind:this={showcase} aria-labelledby="squad-title">
		<div class="details">
			<span class="eyebrow">The selection</span>
			<h2 id="squad-title">Featured<br />Squad 2026</h2>
			<div class="counter" aria-hidden="true">
				{String(active + 1).padStart(2, '0')}<span> / {players.length}</span>
			</div>
			<ol class="player-list" aria-label="Squad players">
				{#each players as player, index (player.name)}
					<li class:active={active === index} aria-current={active === index ? 'true' : undefined}>
						<span>{String(index + 1).padStart(2, '0')}</span>{player.name}
					</li>
				{/each}
			</ol>
		</div>
		<div class="image-viewport" bind:this={viewport}>
			<div class="image-track" bind:this={track}>
				{#each players as player, index (player.name)}
					<article class="player-card" aria-label={player.name}>
						<div class="portrait">
							<span class="portrait-number" aria-hidden="true"
								>{String(index + 1).padStart(2, '0')}</span
							>
							<img
								src={player.image_url}
								alt={player.name}
								width="288"
								height="384"
								onerror={(event) => {
									(event.currentTarget as HTMLImageElement).style.visibility = 'hidden';
								}}
							/>
						</div>
						<div class="player-info">
							<span>{String(index + 1).padStart(2, '0')} / {players.length}</span>
							<h3>{player.name}</h3>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
	<section class="outro">
		<p>Thanks for visiting</p>
		<a href={resolve('/forum')}>Visit the forum ↗</a>
	</section>
</div>

<style>
	.page-wrapper {
		color: #f5f5dc;
		font-family: system-ui, sans-serif;
	}
	.intro,
	.outro {
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
		gap: 1.5rem;
	}
	.eyebrow {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		opacity: 0.65;
	}
	h1 {
		font-size: clamp(3rem, 8vw, 7rem);
		line-height: 1;
		letter-spacing: -0.06em;
		font-weight: 800;
	}
	.intro p,
	.outro p {
		font-size: 1.3rem;
		opacity: 0.7;
	}
	a {
		padding: 0.8rem 0;
		border-bottom: 1px solid currentColor;
	}
	a:focus-visible {
		outline: 2px solid #f5f5dc;
		outline-offset: 6px;
	}
	.showcase {
		height: 100svh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 6vw;
		padding: 5vh 8vw;
		background: #142626;
		overflow: hidden;
	}
	.details {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 0;
	}
	h2 {
		font-size: clamp(2rem, 4vw, 4rem);
		line-height: 1.05;
		letter-spacing: -0.05em;
		margin: 1rem 0;
		font-weight: 750;
	}
	.counter {
		font-size: clamp(2.5rem, 5vw, 5rem);
		line-height: 1.1;
		font-variant-numeric: tabular-nums;
	}
	.counter span {
		font-size: 1rem;
		opacity: 0.45;
	}
	.player-list {
		list-style: none;
		padding: 0;
		margin: 1.5rem 0 0;
	}
	.player-list li {
		display: flex;
		gap: 1.2rem;
		padding: 0.25rem 0;
		opacity: 0.3;
		transition:
			opacity 0.2s,
			transform 0.2s;
		font-size: clamp(0.8rem, 1.3vw, 1rem);
	}
	.player-list li.active {
		opacity: 1;
		transform: translateX(0.5rem);
	}
	.player-list li span {
		font-size: 0.7rem;
		font-variant-numeric: tabular-nums;
	}
	.image-viewport {
		height: 90svh;
		overflow: hidden;
	}
	.image-track {
		width: 100%;
	}
	.player-card {
		height: 90svh;
		display: flex;
		flex-direction: column;
	}
	.portrait {
		flex: 1;
		min-height: 0;
		position: relative;
		background: #294343;
		overflow: hidden;
	}
	.portrait-number {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		color: #f5f5dc22;
		font-size: clamp(6rem, 18vw, 20rem);
		font-weight: 800;
	}
	img {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.player-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.25rem 0;
	}
	.player-info span {
		font-size: 0.75rem;
		opacity: 0.5;
	}
	h3 {
		font-size: clamp(1rem, 2vw, 1.7rem);
	}
	@media (max-height: 740px) and (min-width: 768px) {
		h2 {
			font-size: 2rem;
		}
		.counter {
			font-size: 2.5rem;
		}
		.player-list {
			margin-top: 0.75rem;
		}
		.player-list li {
			padding: 0.1rem 0;
		}
	}
	@media (max-width: 767px), (prefers-reduced-motion: reduce) {
		.showcase {
			height: auto;
			display: block;
			padding: 3rem 6vw;
			overflow: visible;
		}
		.player-list,
		.counter {
			display: none;
		}
		.details {
			margin-bottom: 2rem;
		}
		.image-viewport {
			height: auto;
			overflow: visible;
		}
		.image-track {
			display: grid;
			gap: 2rem;
		}
		.player-card {
			height: auto;
		}
		.portrait {
			flex: auto;
			aspect-ratio: 3 / 4;
		}
	}
</style>
