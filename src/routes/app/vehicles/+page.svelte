<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AppOffcanvas from '$lib/components/AppOffcanvas.svelte';
	import VehicleList from '$lib/components/VehicleList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	/**
	 * Whether the user is adding a vehicle.
	 */
	let isAdding = false;

	/**
	 * Whether the user is editing a vehicle.
	 */
	$: isEditing = $page.url.searchParams.get('edit') !== null;

	$: vehicle = data.vehicles.find((v) => v.id === $page.url.searchParams.get('edit'));
</script>

<div class="container p-5">
	<div class="row justify-content-center">
		<div class="col-8">
			<div class="row justify-content-between">
				<div class="col-auto">
					<h1>Voertuigen</h1>
					<p>Een overzicht van al jouw voertuigen.</p>
				</div>

				<div class="col-auto my-auto">
					<button class="btn btn-primary" on:click={() => (isAdding = true)}>Nieuw</button>
				</div>
			</div>

			<div class="w-100 my-4" />

			<VehicleList vehicles={data.vehicles} />
		</div>
	</div>
</div>

<form action="?/add" method="post">
	<AppOffcanvas show={isAdding} on:closed={() => (isAdding = false)}>
		<span slot="header">
			<h3>Nieuw voertuig</h3>
		</span>

		<label for="model-input" class="form-label">Model</label>
		<input
			type="text"
			name="model"
			id="model-input"
			class="form-control"
			placeholder="Suzuki Gs500e"
		/>

		<span slot="footer">
			<div class="row g-1 justify-content-end">
				<div class="col-4">
					<button class="btn" type="reset" on:click={() => (isAdding = false)}>Annuleren</button>
				</div>
				<div class="col-4">
					<button class="btn btn-primary">Opslaan</button>
				</div>
			</div>
		</span>
	</AppOffcanvas>
</form>

<form action="?/edit" method="post">
	<AppOffcanvas show={isEditing} on:closed={() => goto('/app/vehicles')}>
		<span slot="header">
			<h3>Voertuig aanpassen</h3>
		</span>

		<input type="text" name="id" id="id-input" value={vehicle?.id} hidden />

		<label for="model-input" class="form-label">Model</label>
		<input
			type="text"
			name="model"
			id="model-input"
			class="form-control"
			placeholder="Suzuki Gs500e"
			value={vehicle?.model}
		/>

		<span slot="footer">
			<div class="row g-1 justify-content-end">
				<div class="col-4">
					<button class="btn" type="reset" on:click={() => goto('/app/vehicles')}>Annuleren</button>
				</div>
				<div class="col-4">
					<button class="btn btn-primary">Opslaan</button>
				</div>
			</div>
		</span>
	</AppOffcanvas>
</form>
