<script lang="ts">
  import TheSidebar from "$lib/components/TheSidebar.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container-fluid">
  <div class="row vh-100">
    <div class="col-2">
      <TheSidebar user={data.user} sections={data.sections} />
    </div>

    <div class="col-10">
      <slot />
    </div>
  </div>
</div>
