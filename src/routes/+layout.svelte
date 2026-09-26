<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

	let mycanvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = mycanvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;

		const dpr = window.devicePixelRatio;
		console.log(dpr);

		// create objects
		const objects: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
		for (let i = 0; i < 25; i++) {
			objects.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				vx: (Math.random() - 0.5) * 2,
				vy: (Math.random() - 0.5) * 2,
				radius: Math.random() * 7 + 5
			});
		}

		// drawing
		const draw = () => {
			ctx.save();
			ctx.scale(dpr, dpr);

			ctx.fillStyle = '#2F4F4F';
			ctx.fillRect(0, 0, mycanvas.width, mycanvas.height);

			ctx.fillStyle = '#F5F5DC';
			objects.forEach((obj) => {
				ctx.beginPath();
				ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
				ctx.fill();

				//move positions
				obj.x += obj.vx;
				obj.y += obj.vy;

				// bounce
				if (obj.x > window.innerWidth / dpr || obj.x < 0) {
					obj.vx *= -1;
				}
				if (obj.y > window.innerHeight / dpr || obj.y < 0) {
					obj.vy *= -1;
				}
			});

			animationFrameId = requestAnimationFrame(draw);
			ctx.restore();
		};

		draw();

		const resizeCanvas = () => {
			mycanvas.width = window.innerWidth;
			mycanvas.height = window.innerHeight;
			draw();
		};
		window.addEventListener('resize', resizeCanvas);
		resizeCanvas();

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', resizeCanvas);
		};
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div>
	<canvas
		bind:this={mycanvas}
		class="pointer-events-none fixed top-0 left-0 -z-10 block h-full w-full"
	></canvas>
	<main>
		{@render children()}
	</main>
</div>
