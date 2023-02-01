<script lang="ts">
	import VehicleList from '$lib/components/VehicleList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
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
					<a href="/app/vehicles/add" class="btn btn-primary">Nieuw</a>
				</div>
			</div>

			<div class="w-100 my-4" />

			<VehicleList vehicles={data.vehicles} />
		</div>
	</div>
</div>
