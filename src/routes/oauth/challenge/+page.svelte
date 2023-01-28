<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Fordon - Inloggen</title>
</svelte:head>

{#if form === null}
	<form action="?/challenge" method="post">
		<label for="email-input">
			E-mailadres
			<input type="email" name="email" id="email-input" />
		</label>

		<button>Verstuur link</button>
	</form>
{:else}
	<pre>{JSON.stringify(form)}</pre>
{/if}
