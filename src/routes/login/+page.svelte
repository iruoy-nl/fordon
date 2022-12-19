<script lang="ts">
  import type { LoginForm } from "$lib/types";

  /**
   * The login form.
   */
  export let form: LoginForm & {
    errors: { [name: string]: string };
  };
</script>

<div class="row my-5 justify-content-center">
  <div class="col-12 col-sm-8 col-lg-4">
    <!-- Align everything within the 4 center columns -->
    <form action="?/login" method="post">
      <div class="row">
        <div class="col">
          <h2>Inloggen</h2>
          <p>Vul je e-mailadres en wachtwoord in om naar Fordon te gaan.</p>
        </div>

        <div class="w-100" />

        <!-- Email field -->
        <div class="col mt-3">
          <label for="email" class="form-label">E-mailadres</label>

          <div class="input-group has-validation">
            <input
              class="form-control {form?.errors.email ? 'is-invalid' : ''}"
              type="email"
              name="email"
              value={form?.email ?? null}
              required
            />

            {#if form?.errors.email}
              <div class="invalid-feedback">
                {form?.errors.email[0]}
              </div>
            {/if}
          </div>
        </div>

        <div class="w-100" />

        <!-- Password field -->
        <div class="col mt-3">
          <label for="password" class="form-label"> Wachtwoord </label>

          <div class="input-group has-validation">
            <input
              class="form-control {form?.errors.password ? 'is-invalid' : ''}"
              type="password"
              name="password"
              value={form?.password ?? ""}
              required
            />

            {#if form?.errors.password}
              <div class="invalid-feedback">
                {form?.errors.password[0]}
              </div>
            {/if}
          </div>
        </div>

        <div class="w-100" />

        <!-- Submit button -->
        <div class="col mt-3">
          <button class="btn btn-primary">Inloggen</button>
        </div>
      </div>
    </form>
  </div>
</div>
