<script lang="ts">
	import { page } from '$app/stores';
	import type { Page, User } from '$lib/types';
	import * as O from 'fp-ts/lib/Option';

	export let user: User;

	export let sections: Page[] = [
		{ icon: 'speedometer', title: 'Overzicht', href: '/app/dashboard' },
		{ icon: 'signpost', title: 'Kilometers', href: '/app/mileage' },
		{ icon: 'tools', title: 'Onderhoud', href: '/app/maintenance' },
		{ icon: 'card-heading', title: 'Voertuigen', href: '/app/vehicles' },
		{ icon: 'gear', title: 'Instellingen', href: '/app/settings' }
	];
</script>

<div class="row h-100 justify-content-between border-end p-4">
	<div class="col">
		<span class="text-primary">
			<i class="bi bi-circle-fill align-middle" style="font-size: 0.5rem;" />
			Fordon
		</span>
	</div>

	<div class="w-100" />

	<div class="col">
		<ul class="list-group">
			{#each sections as { href, icon, title }}
				<a
					{href}
					class="list-group-item rounded border-0 p-3 my-1"
					class:active={$page.url.pathname.startsWith(href)}
				>
					<i class="bi bi-{icon} me-2" />
					{title}
				</a>
			{/each}
		</ul>
	</div>

	<div class="w-100" />

	<div class="col text-center mt-auto">
		{#if O.isSome(user.email)}
			<small class="text-muted">
				{user.email.value}
			</small>
		{/if}

		<div class="w-100 my-2" />

		<button class="btn border">
			<i class="bi bi-door-closed me-2" />
			Uitloggen
		</button>
	</div>
</div>
