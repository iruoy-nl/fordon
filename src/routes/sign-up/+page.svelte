<script lang="ts">
  import BaseInput from "$lib/components/BaseInput.svelte";
  import type { ActionData } from "./$types";

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
          <form action="?/signUp" method="post">
            <div class="row justify-content-center">
              <div class="col-6">
                <h2>Registreren</h2>
                <p class="text-muted">
                  Kies een e-mailadres en wachtwoord om een account aan te maken
                  bij Fordon.
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
                  id="email"
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
                  id="password"
                  placeholder="●●●●●●●●"
                  value=""
                  type="password"
                  error={form?.errors.fieldErrors.password?.at(0)}
                />
              </div>

              <div class="w-100 my-2" />

              <div class="col-6">
                <BaseInput
                  label="Herhaal wachtwoord"
                  id="passwordConfirm"
                  placeholder="●●●●●●●●"
                  value=""
                  type="password"
                  error={form?.errors.fieldErrors.passwordConfirm?.at(0)}
                />
              </div>

              <div class="w-100 my-3" />

              <div class="col-6">
                <button class="btn btn-primary">Registreren</button>
              </div>

              <div class="w-100 my-3" />

              <div class="col-6 text-center">
                <span class="text-muted">Heb je al een account?</span>
                <a href="/sign-in" class="text-primary">Inloggen</a>
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
