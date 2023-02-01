<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	/**
	 * The total width of the offcanvas in pixels.
	 */
	export let width = 512;

	/**
	 * Whether to show the offcanvas.
	 */
	export let show = false;

	const dispatch = createEventDispatcher();

	const offcanvasFly = { x: width, duration: 300 };
	const offcanvasFade = { duration: 300 };

	/**
	 * Dispatch an event when it is openend.
	 */
	$: if (show) dispatch('opened');

	/**
	 * Indicate that the offcanvas should be closed.
	 */
	function close() {
		show = false;
		dispatch('closed');
	}

	/**
	 * Call 'close' when the 'Esc' key has been pressed.
	 */
	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}
</script>

<svelte:window on:keydown={onKeydown} />

{#if show}
	<div
		class="offcanvas offcanvas-end show"
		transition:fly={offcanvasFly}
		style="min-width: {width}px;"
		tabindex="-1"
	>
		{#if $$slots.header}
			<div class="offcanvas-header p-4 border-bottom">
				<slot name="header" />
			</div>
		{/if}

		<div class="offcanvas-body p-4">
			<slot />
		</div>

		{#if $$slots.footer}
			<div class="offcanvas-footer p-4 border-top">
				<slot name="footer" />
			</div>
		{/if}
	</div>

	<div
		class="offcanvas-backdrop show"
		transition:fade={offcanvasFade}
		on:click={close}
		on:keypress={close}
	/>
{/if}
