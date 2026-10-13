<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';

	let { data, children } = $props();
	let { session, user } = $derived(data);

	let mycanvas: HTMLCanvasElement;

	onMount(() => {
		// invalidate supabase
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		// canvas animation
		const ctx = mycanvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;

		const dpr = window.devicePixelRatio;
		console.log(dpr);

		// create objects
		const particleCount = 35;
		const maxDistance = 120;
		const objects: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
		for (let i = 0; i < particleCount; i++) {
			objects.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				vx: (Math.random() - 0.5) * 0.8, // Slower, more graceful movement
				vy: (Math.random() - 0.5) * 0.8,
				radius: Math.random() * 2 + 1.5 // Smaller, sleeker dots
			});
		}

		// drawing
		const draw = () => {
			ctx.save();
			ctx.scale(dpr, dpr);

			ctx.fillStyle = '#1a2e2e';
			ctx.fillRect(0, 0, mycanvas.width, mycanvas.height);

			ctx.fillStyle = 'rgba(245, 245, 220, 0.4)';
			objects.forEach((obj, index) => {
				ctx.beginPath();
				ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
				ctx.fill();

				for (let j = index + 1; j < particleCount; j++) {
					const other = objects[j];
					const dx = other.x - obj.x;
					const dy = other.y - obj.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < maxDistance) {
						const opacity = (1 - distance / maxDistance) * 2;
						ctx.strokeStyle = `rgba(245, 245, 220,${opacity})`;
						ctx.lineWidth = 0.8;
						ctx.beginPath();
						ctx.moveTo(obj.x, obj.y);
						ctx.lineTo(other.x, other.y);
						ctx.stroke();
					}
				}

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
			subscription.unsubscribe();
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

<style>
	* {
		box-sizing: border-box;
	}
</style>
