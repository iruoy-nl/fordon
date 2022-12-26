<script lang="ts">
  import { page } from "$app/stores";
  import type { Section, User } from "$lib/types";

  /**
   * The current user.
   */
  export let user: User;

  /**
   * The sections to display.
   */
  export let sections: Section[];
</script>

<div class="row h-100 border-end justiy-content-between p-4">
  <div class="col">
    <h3 class="text-primary">● Fordon</h3>
  </div>

  <div class="w-100" />

  <div class="col">
    <ul class="list-group">
      {#each sections as section (section.href)}
        <a
          class="list-group-item border-0 rounded p-3"
          class:active={section.href === $page.route.id}
          href={section.href}
        >
          <i class="bi bi-{section.icon} me-2" />
          {section.title}
        </a>
      {/each}
    </ul>
  </div>

  <div class="w-100" />

  <div class="col text-center mt-auto">
    <img
      class="rounded-circle"
      src={user.avatar || "https://via.placeholder.com/64"}
      alt="avatar"
      style="width: 64px; height: 64px;"
    />

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
