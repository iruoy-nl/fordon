<script lang="ts">
  import Navigation from "$lib/components/Navigation.svelte";
  import "../app.scss";
</script>

<Navigation />

<div class="container">
  <slot />
</div>
