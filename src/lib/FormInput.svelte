<script lang="ts">
	let { name, value = $bindable(''), type = 'text' } = $props();
</script>

<input {name} bind:value {type} />

<style>
	input {
		padding: 8px;
		border-radius: 6px;
		margin-bottom: 8px;
	}
	input:focus {
		border-color: #2f4f4f;
		box-shadow: 0 0 0 1px #2f4f4f;
	}
</style>
