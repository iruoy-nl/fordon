<script lang="ts">
  /**
   * The label to display above the field.
   */
  export let label: string = "";

  /**
   * A placeholder to display within the field.
   */
  export let placeholder: string = "";

  /**
   * The type of input to display.
   */
  export let type: "text" | "email" | "password" = "text";

  /**
   * The name of the value.
   */
  export let name: string;

  /**
   * The value of the field.
   */
  export let value: unknown;

  /**
   * An error message to display below the field.
   */
  export let error: string | null = null;
</script>

<label for={name} class="form-label">{label}</label>

<div class="input-group has-validation">
  <input
    class="form-control"
    class:is-invalid={error !== null}
    required
    {name}
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
