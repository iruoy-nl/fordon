<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="row">
	{#each data.vehicles as vehicle}
		<div class="col-4">
			<div class="card">
				<div class="card-body">
					<a class="card-title" href="/app/vehicles?selected={vehicle.uid}">
						{vehicle.model}
					</a>
					<div class="card-text">32.948km</div>
				</div>
			</div>
		</div>
	{/each}
</div>
