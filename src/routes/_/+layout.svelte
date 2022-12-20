<script lang="ts">
  import Navigation from "$lib/components/Navigation.svelte";
  import type { User } from "$lib/types";

  /**
   * Incoming data.
   */
  export let data: { user: User };
</script>

<Navigation user={data.user} />
<slot />
