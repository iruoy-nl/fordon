<script lang="ts">
  import BaseInput from "$lib/components/BaseInput.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<div class="row vh-100">
  <div class="col-6">
    <div class="row h-100 p-4">
      <!-- Header -->
      <div class="col-12">
        <span class="text-primary">● Fordon</span>
      </div>

      <!-- Main -->
      <div class="col">
        <form action="?/login" method="post">
          <div class="row justify-content-center">
            <div class="col-6">
              <h2>Welcome back</h2>
              <p class="text-muted">
                Please enter your credentials to continue.
              </p>
            </div>

            <div class="w-100 my-3" />

            <div class="col-6">
              <BaseInput
                label="Email"
                name="email"
                placeholder="Enter your email"
                value={form?.data.email || ""}
                type="email"
                error={form?.errors.fieldErrors.email?.at(0)}
              />
            </div>

            <div class="w-100 my-2" />

            <div class="col-6">
              <BaseInput
                label="Password"
                name="password"
                placeholder="●●●●●●●●"
                value=""
                type="password"
                error={form?.errors.fieldErrors.password?.at(0)}
              />
            </div>

            <div class="w-100 my-3" />

            <div class="col-6">
              <button class="btn btn-primary">Login</button>
            </div>

            <div class="w-100 my-3" />

            <div class="col-6 text-center">
              <span class="text-muted">Don't have an account?</span>
              <a href="/register" class="text-primary">Register</a>
            </div>

            <div class="w-100 my-5" />
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="col-6 bg-light" />
</div>
