<script lang="ts">
  import BaseInput from "$lib/components/BaseInput.svelte";
  import type { ActionData } from "./$types";

  /**
   * Form data.
   */
  export let form: ActionData;
</script>

<div class="container-fluid">
  <div class="row vh-100">
    <div class="col-6">
      <div class="row h-100 p-4">
        <!-- Header -->
        <div class="col-12">
          <h3 class="text-primary">● Fordon</h3>
        </div>

        <!-- Main -->
        <div class="col">
          <form action="?/login" method="post">
            <div class="row justify-content-center">
              <div class="col-6">
                <h2>Welkom terug</h2>
                <p class="text-muted">
                  Gebruik je e-mailadres en wachtwoord om door te gaan.
                </p>
              </div>

              <div class="w-100 my-3" />

              {#if form?.errors.formErrors.at(0)}
                <div class="col-6">
                  <div class="alert alert-danger">
                    {form?.errors.formErrors.at(0)}
                  </div>
                </div>

                <div class="w-100 my-2" />
              {/if}

              <div class="col-6">
                <BaseInput
                  label="E-mailadres"
                  name="email"
                  placeholder="Voer je e-mailadres in"
                  value={form?.data.email || ""}
                  type="email"
                  error={form?.errors.fieldErrors.email?.at(0)}
                />
              </div>

              <div class="w-100 my-2" />

              <div class="col-6">
                <BaseInput
                  label="Wachtwoord"
                  name="password"
                  placeholder="●●●●●●●●"
                  value=""
                  type="password"
                  error={form?.errors.fieldErrors.password?.at(0)}
                />
              </div>

              <div class="w-100 my-3" />

              <div class="col-6">
                <button class="btn btn-primary">Inloggen</button>
              </div>

              <div class="w-100 my-3" />

              <div class="col-6 text-center">
                <span class="text-muted">Nog geen account?</span>
                <a href="/register" class="text-primary">Registreren</a>
              </div>

              <div class="w-100 my-5" />
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="col-6 image" />
  </div>
</div>

<style lang="scss">
  .image {
    background-image: url("https://images.unsplash.com/photo-1619677122678-b8e28f74cf42?w=700&h=900");
    background-size: cover;

    // Fallback
    background-color: $light;
  }
</style>
