<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	/**
	 * Whether the modal is shown.
	 */
	export let show: boolean = false;

	const dispatch = createEventDispatcher();

	const flyTransition = { y: -50, duration: 300 };
	const fadeTransition = { duration: 300 };

	/**
	 * Indicate that the modal should be closed.
	 */
	const close = () => dispatch('close');

	/**
	 * Close when the 'Esc' key has been pressed.
	 */
	const onKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') close();
	};
</script>

<svelte:window on:keydown={onKeydown} />

{#if show}
	<div class="modal" transition:fly={flyTransition} tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				{#if $$slots.header}
					<div class="modal-header">
						<slot name="header" />
					</div>
				{/if}

				{#if $$slots.body}
					<div class="modal-body">
						<slot name="body" />
					</div>
				{/if}

				{#if $$slots.footer}
					<div class="modal-footer">
						<slot name="footer" />
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div
		class="modal-backdrop show"
		transition:fade={fadeTransition}
		on:click={close}
		on:keypress={close}
	/>
{/if}

<style lang="scss">
	.modal {
		display: block;
		pointer-events: none;
	}
</style>
