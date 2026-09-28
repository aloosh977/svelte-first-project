<script lang="ts">
	let props = $props();
</script>

<button {...props}>{props.text}</button>

<style>
	button {
		margin-top: 10px;
		padding: 8px;
		border-radius: 6px;
		font-weight: 600;
		color: beige;
		background-color: #2f4f4f;
		border: 0;
		cursor: pointer;
	}
	button:disabled {
		opacity: 60%;
		cursor: default;
	}
</style>
