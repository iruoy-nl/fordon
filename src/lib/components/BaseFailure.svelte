<script lang="ts">
  import type { Failure } from "$lib/types";

  /**
   * The failure to display.
   */
  export let failure: Failure;

  /**
   * Refresh the current page.
   */
  const refresh = (): void => {
    window.location.reload();
  };
</script>

<div class="row justify-content-center">
  <div class="col-4 text-center">
    <i class="bi bi-fire text-warning" />
    <i class="bi bi-car-front" />

    <p>{failure.message}</p>
  </div>

  <div class="w-100 my-2" />

  <div class="col-auto">
    <button class="btn btn-primary" on:click={refresh}>Herladen</button>
  </div>
</div>

<style lang="scss">
  i {
    font-size: 4rem;
  }
</style>
