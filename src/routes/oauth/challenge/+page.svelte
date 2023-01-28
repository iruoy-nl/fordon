<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="row">
	<div class="col">
		<h2 class="mb-1">Welkom bij Fordon!</h2>
		<p class="text-muted">
			Vul hieronder jouw e-mailadres in om een account aan te maken of in te loggen.
		</p>
	</div>

	<div class="w-100 my-2" />

	{#if form?.ok === false}
		<div class="col">
			<div class="alert alert-danger">
				<i class="bi bi-exclamation-octagon-fill me-1" />
				{form.error?.message}
			</div>
		</div>
	{/if}

	{#if form?.ok === true}
		<div class="col">
			<div class="alert alert-success">
				<i class="bi bi-check-circle-fill me-1" />
				We hebben een e-mail naar je verstuurd. Gebruik de link in de e-mail om in te loggen.
			</div>
		</div>
	{/if}

	{#if form?.ok !== true}
		<form method="post">
			<div class="col">
				<label for="email-input" class="form-label"> E-mailadres </label>
				<input type="email" class="form-control" name="email" id="email-input" />
			</div>

			<div class="w-100 my-4" />

			<div class="col-auto">
				<button class="btn btn-primary">Doorgaan</button>
			</div>
		</form>
	{/if}

	<div class="w-100 my-5" />
</div>
