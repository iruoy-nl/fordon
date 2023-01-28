<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Fordon - App</title>
</svelte:head>

<pre>{JSON.stringify(data, null, 2)}</pre>
