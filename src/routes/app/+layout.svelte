<script lang="ts">
  import type { User } from "$lib/types";

  /**
   * Incoming data.
   */
  export let data: { user: User };
</script>

<nav class="navbar">
  <div class="container">
    <a href="/" class="navbar-brand">Fordon</a>

    <div class="navbar-items">
      <form method="POST" action="?/logout">
        <span class="text-muted">{data.user.email}</span>

        <button class="btn btn-secondary btn-sm">Uitloggen</button>
      </form>
    </div>
  </div>
</nav>

<slot />

<style lang="scss">
  .navbar {
    border-bottom: 1px solid #ced4da;

    .navbar-brand {
      color: $primary;
    }

    .navbar-items * {
      margin-left: 0.5rem;
    }
  }
</style>
