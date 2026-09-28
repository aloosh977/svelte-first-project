<script lang="ts">
	import { loading } from './loading.svelte';
</script>

{#if loading.show}
	<div class="loader">
		<div class="loadingText">Loading...</div>
	</div>
{/if}

<style>
	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		height: 100svh;
		width: 100%;
		opacity: 80%;
		z-index: 2;
		background-color: gray;
		color: white;
	}
	.loadingText {
		animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
	@keyframes pulse {
		50% {
			opacity: 50%;
		}
	}
</style>
