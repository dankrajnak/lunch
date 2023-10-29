<script>
  import { AppBar } from "@skeletonlabs/skeleton";
  import User from "$lib/components/User.svelte";
  import Home from "svelte-material-icons/Home.svelte";
  import MapPlus from "svelte-material-icons/MapPlus.svelte";
  import SignOutLogo from "svelte-material-icons/ExitToApp.svelte";
  import { page } from "$app/stores";

  const inApp = $page.url.pathname.startsWith("/app");
</script>

<User let:auth>
  <div slot="loading">
    {#if inApp}
      <!-- Render a blank navbar to avoid page shift -->
      <AppBar>
        <!-- It's a hack, I know -->
        <div slot="lead" class=" h-[24px]" />
      </AppBar>
    {/if}
  </div>
  <AppBar>
    <div slot="lead" class="flex items-center space-x-4">
      <a href="/app" class="flex items-center justify-center opacity-100">
        <Home class="mr-2" />Home
      </a>
      <a href="/app/place/add" class="flex items-center justify-center">
        <MapPlus class="mr-2" />Add Place
      </a>
    </div>

    <svelte:fragment slot="trail">
      <button class="p-0" title="Sign Out" on:click={() => auth.signOut()}>
        <SignOutLogo />
      </button>
    </svelte:fragment>
  </AppBar>
</User>
