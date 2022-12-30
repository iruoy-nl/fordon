<script lang="ts">
  import { page } from "$app/stores";
  import type { User } from "$lib/types";

  /**
   * The current user.
   */
  export let user: User;

  /**
   * The available pages.
   */
  const pages = [
    { icon: "speedometer", title: "Overzicht", href: "/app/dashboard" },
    { icon: "signpost", title: "Kilometers", href: "/app/mileage" },
    { icon: "tools", title: "Onderhoud", href: "/app/maintenance" },
    { icon: "card-heading", title: "Garage", href: "/app/vehicles" },
    { icon: "gear", title: "Instellingen", href: "/app/settings" },
  ];
</script>

<div class="row h-100 border-end justiy-content-between p-4">
  <div class="col">
    <h3 class="text-primary">● Fordon</h3>
  </div>

  <div class="w-100" />

  <div class="col">
    <ul class="list-group">
      {#each pages as { icon, title, href } (href)}
        <a
          class="list-group-item border-0 rounded p-3"
          class:active={href === $page.route.id}
          {href}
        >
          <i class="bi bi-{icon} me-2" />
          {title}
        </a>
      {/each}
    </ul>
  </div>

  <div class="w-100" />

  <div class="col text-center mt-auto">
    {#if user.avatar}
      <img
        class="rounded-circle"
        src={user.avatar}
        alt="avatar"
        style="width: 64px; height: 64px;"
      />
    {:else}
      <i class="bi bi-person-circle text-muted" style="font-size: 64px;" />
    {/if}

    <div class="w-100 my-2" />

    <h4 class="text-primary">{user.name}</h4>
    <small class="text-muted">{user.email}</small>

    <div class="w-100 my-3" />

    <div class="row">
      <form action="/app?/logout" method="post">
        <button class="btn btn-light border">
          <i class="bi bi-door-closed me-2" />
          Uitloggen
        </button>
      </form>
    </div>
  </div>
</div>
