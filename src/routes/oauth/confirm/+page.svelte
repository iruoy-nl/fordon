<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Fordon - Inloggen</title>
</svelte:head>

<form action="?/confirm" method="post">
	<input type="link" name="link" id="link-input" value={$page.url} hidden />

	<label for="email-input">
		E-mailadres
		<input type="email" name="email" id="email-input" />
	</label>

	<button>Bevestigen</button>
</form>
