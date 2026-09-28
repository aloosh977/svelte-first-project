<script lang="ts">
	import FormInput from '$lib/FormInput.svelte';
	import Button from '$lib/Button.svelte';
	import Loader from '$lib/Loader.svelte';
	import { loading } from '$lib/loading.svelte';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let referrer = $state('');

	// $effect(() => {
	// 	console.log(name);
	// 	console.log(email);
	// });

	let completedFields: number = $derived.by(() => {
		let total: number = 0;
		if (name.trim() != '') {
			total++;
		}
		if (email.trim() != '') {
			total++;
		}
		if (password.trim() != '') {
			total++;
		}
		if (referrer.trim() != '') {
			total++;
		}
		return total;
	});
</script>

<Loader />

<div class="mainContainer">
	<div class="contentBubble">
		<div class="txt">Name:</div>
		<FormInput name="name" bind:value={name} />
		<div class="txt">Email:</div>
		<FormInput name="email" type="email" bind:value={email} />
		<div class="txt">Password:</div>
		<FormInput name="password" type="password" bind:value={password} />
		<div class="txt">How did you hear about us?</div>
		<FormInput name="referrer" bind:value={referrer} />
		{#if completedFields < 4}
			<div class="alert">{completedFields} of 4 filled out</div>
		{/if}
		<Button
			text="Submit"
			type="button"
			disabled={completedFields < 4}
			onclick={() => {
				loading.show = true;
				setTimeout(() => {
					loading.show = false;
				}, 2000);
			}}
		/>
	</div>
</div>

<style>
	.mainContainer {
		height: 100svh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.contentBubble {
		min-height: 200px;
		width: 50%;
		max-width: 500px;
		background-color: beige;
		margin: auto;
		border-radius: 15px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 50px;
	}
	.txt {
		color: #2f4f4f;
	}
	.alert {
		background-color: rgb(255, 147, 147);
		color: darkred;
		border-radius: 6px;
		padding: 8px;
		margin-bottom: 8px;
	}
</style>
