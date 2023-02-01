<script lang="ts">
	import type { Vehicle } from '$lib/types';

	export let vehicles: Vehicle[];
</script>

<div class="row g-3">
	{#each vehicles as vehicle}
		<div class="col-4">
			<div class="card">
				<div class="card-img-top" />

				<div class="card-body">
					<a class="card-title text-primary" href="/app/vehicles/edit?id={vehicle.id}">
						{vehicle.model}
					</a>

					<div class="card-text">
						<small class="text-muted">{vehicle.id}</small>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.card-img-top {
		height: 10rem;
		background: $light;
		object-fit: cover;
	}
</style>
