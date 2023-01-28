<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="row">
	<div class="col">
		<small class="text-muted">Stap 1/2</small>
		<h2 class="mb-1">Inloggen via e-mail</h2>
		<p>We zijn jouw e-mailadres nodig om door te kunnen naar Fordon.</p>
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
				We hebben een e-mail naar je verstuurd waarmee je kunt inloggen. Dit tabblad kun je nu sluiten.
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
