<script lang="ts">
  import BaseFailure from "$lib/components/BaseFailure.svelte";
  import { isLeft } from "fp-ts/Either";
  import type { PageData } from "../vehicles/$types";

  export let data: PageData;
</script>

<div class="container-fluid p-4">
  <div class="row justify-content-between">
    <div class="col-6">
      <h1>Garage</h1>
    </div>

    <div class="col-auto my-auto">
      <button class="btn btn-primary">Toevoegen</button>
    </div>
  </div>

  <div class="w-100 my-4" />

  {#if isLeft(data.vehicles)}
    <div class="pt-5">
      <BaseFailure failure={data.vehicles.left} />
    </div>
  {:else}
    <!-- Empty -->
    {#if data.vehicles.right.length === 0}
      <div class="row justify-content-center pt-5">
        <div class="col-4 text-center">
          <i class="bi bi-cone-striped" style="font-size: 4rem;" />

          <p>
            Er staan nog geen voertuigen in jouw garage. Druk op
            <span class="text-primary">toevoegen</span>
            om één in te parkeren.
          </p>
        </div>
      </div>
    {:else}
      <!-- Non-empty -->
      <div class="row">
        {#each data.vehicles.right as vehicle (vehicle.id)}
          <div class="col-3">
            <div class="card">
              <img src={vehicle.avatar} class="card-img-top" alt="avatar" />

              <div class="card-body">
                <h5 class="card-title">{vehicle.model}</h5>
                <p class="card-text">Lorem, ipsum dolor.</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>
