<script lang="ts">
  import VehicleGrid from "$lib/components/VehicleGrid.svelte";
  import * as E from "fp-ts/Either";
  import type { PageData } from "../garage/$types";

  export let data: PageData;
</script>

<div class="container-fluid p-4">
  <div class="row">
    <div class="col">
      <h1>Garage</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </div>

    <div class="w-100 my-3" />

    <div class="col">
      {#if E.isRight(data.vehicles)}
        <VehicleGrid vehicles={data.vehicles.right} />
      {/if}
    </div>
  </div>
</div>
