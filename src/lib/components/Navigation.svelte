<script lang="ts">
  import type { User } from "$lib/types";

  /**
   * The current user.
   */
  export let user: User;
</script>

<nav class="navbar">
  <div class="container">
    <a href="/" class="navbar-brand">Fordon</a>

    <div class="d-flex">
      {user.email}
    </div>
  </div>
</nav>

<style lang="scss">
  .navbar {
    border-bottom: 1px solid #ced4da;

    .navbar-brand {
      color: $primary;
    }
  }
</style>
