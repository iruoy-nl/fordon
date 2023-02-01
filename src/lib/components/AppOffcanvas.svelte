<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	/**
	 * The total width of the offcanvas in pixels.
	 */
	export let width = 512;

	/**
	 * Whether to show the offcanvas.
	 */
	export let show = false;

	const offcanvasFly = { x: width, duration: 300 };
	const offcanvasFade = { duration: 300 };

	/**
	 * Indicate that the offcanvas should be closed.
	 */
	function close() {
		show = false;
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
		<div class="offcanvas-header">
			<slot name="header" />
		</div>
		<div class="offcanvas-body">
			<slot />
		</div>
	</div>

	<div
		class="offcanvas-backdrop show"
		transition:fade={offcanvasFade}
		on:click={close}
		on:keypress={close}
	/>
{/if}
