<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Fordon - Voertuigen</title>
</svelte:head>

<div class="container-small p-5">
	<div class="row">
		<div class="col">
			<h1>Voertuigen</h1>
		</div>

		<div class="w-100 my-4" />

		<div class="col">
			<pre>{JSON.stringify(data.vehicles, null, 2)}</pre>
		</div>
	</div>
</div>
