<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AppModal from '$lib/components/AppModal.svelte';
	import * as A from 'fp-ts/lib/Array';
	import { pipe } from 'fp-ts/lib/function';
	import * as O from 'fp-ts/lib/Option';
	import type { PageData } from './$types';

	export let data: PageData;

	$: id = $page.url.searchParams.get('id');

	$: vehicle = pipe(
		data.vehicles,
		A.findFirst((v) => v.id === id)
	);

	$: show = O.isSome(vehicle);
</script>

<div class="row">
	{#each data.vehicles as vehicle}
		<div class="col-4">
			<div class="card">
				<div class="card-body">
					<a class="card-title text-primary" href="/app/vehicles?id={vehicle.id}">
						{vehicle.model}
					</a>
					<div class="card-text">32.948km</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<AppModal {show} on:close={() => goto('/app/vehicles')}>
	<span slot="header">
		<h3>Wijzigen</h3>
	</span>

	<span slot="body">
		{#if O.isSome(vehicle)}
			<label for="model-input" class="form-label">Model</label>
			<input
				type="text"
				name="model"
				id="model-input"
				class="form-control"
				value={vehicle.value.model}
			/>
		{/if}
	</span>

	<span slot="footer">
		<div class="row g-1">
			<div class="col-auto">
				<button class="btn" on:click={() => goto('/app/vehicles')}>Sluiten</button>
			</div>

			<div class="col-auto">
				<button class="btn btn-primary" on:click={() => goto('/app/vehicles')}>Opslaan</button>
			</div>
		</div>
	</span>
</AppModal>
