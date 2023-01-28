<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="row">
	<div class="col">
		<small class="text-muted">Stap 2/2</small>
		<h2 class="mb-1">Inloggen via E-mail</h2>
		<p>Ter controle vragen we je nog één keer jouw e-mailadres in te vullen.</p>
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

	{#if form?.ok !== true}
		<form method="post">
			<div class="col">
				<input type="link" name="link" id="link-input" value={$page.url} hidden />
			</div>

			<div class="col">
				<label for="email-input" class="form-label"> E-mailadres </label>
				<input type="email" class="form-control" name="email" id="email-input" />
			</div>

			<div class="w-100 my-4" />

			<div class="col-auto">
				<button class="btn btn-primary">Bevestigen</button>
			</div>
		</form>
	{/if}

	<div class="w-100 my-5" />
</div>
