<script lang="ts">
  import type { Vehicle } from "$lib/types";

  /**
   * The vehicles to display.
   */
  export let vehicles: Vehicle[];
</script>

<div class="row">
  {#each vehicles as vehicle (vehicle.id)}
    <div class="col-3">
      <div class="card">
        <img class="card-img-top" src={vehicle.avatar} alt="avatar" />

        <div class="card-body">
          <h5 class="card-title">{vehicle.model}</h5>
          <p class="card-text">Lorem, ipsum dolor.</p>
        </div>
      </div>
    </div>
  {/each}

  <div class="col-3 rounded card-new p-0">
    <button class="btn h-100 text-muted">
      <i class="bi bi-plus-circle me-2" />
      Nieuw voertuig
    </button>
  </div>
</div>

<style lang="scss">
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }

  .card-new {
    border: 1px dashed $gray-300;

    display: grid;
    place-items: center;
  }
</style>
