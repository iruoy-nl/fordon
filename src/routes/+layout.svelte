<script lang="ts">
  import Navigation from "$lib/components/Navigation.svelte";
  import "../app.css";
</script>

<Navigation />

<div class="container">
  <slot />
</div>
