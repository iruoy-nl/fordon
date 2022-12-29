<script lang="ts">
  export let label: string = "";
  export let placeholder: string = "";
  export let type: "text" | "email" | "password" = "text";
  export let id: string;
  export let value: unknown;
  export let error: string | null = null;
</script>

<label for={id} class="form-label">{label}</label>

<div class="input-group has-validation">
  <input
    class="form-control"
    class:is-invalid={error !== null}
    required
    name={id}
    {id}
    {type}
    {value}
    {placeholder}
  />

  {#if error !== null}
    <div class="invalid-feedback">
      {error}
    </div>
  {/if}
</div>
