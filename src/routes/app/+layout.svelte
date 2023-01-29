<script lang="ts">
	import TheNavigation from '$lib/components/TheNavigation.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="container-fluid">
	<div class="row vh-100">
		<div class="col-2">
			<TheNavigation user={data.user} />
		</div>

		<div class="col-10">
			<slot />
		</div>
	</div>
</div>
