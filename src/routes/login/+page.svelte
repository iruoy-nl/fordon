<script lang="ts">
  import BaseInput from "$lib/components/BaseInput.svelte";
  import type { LoginForm } from "$lib/types";

  /**
   * Form data.
   */
  export let form: LoginForm & {
    errors: { [field: string]: string };
  };
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
                value={form?.email || ""}
                type="email"
                error={form?.errors?.email[0]}
              />
            </div>

            <div class="w-100 my-2" />

            <div class="col-6">
              <BaseInput
                label="Password"
                name="password"
                placeholder="●●●●●●●●"
                value={form?.password || ""}
                type="password"
                error={form?.errors?.password[0]}
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
