<script lang="ts">
  import type { User } from "$lib/types";

  export let data: { user: User };
</script>

{JSON.stringify(data.user)}
