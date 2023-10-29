<script lang="ts">
  import SignIn from "./SignIn.svelte";
  import { AppBar, AppShell } from "@skeletonlabs/skeleton";
  import User from "$lib/components/User.svelte";
  import { SignedIn, userStore } from "sveltefire";
  import { signOut } from "firebase/auth";
  import { auth } from "$lib/client/firebase";
  import SignOutLogo from "svelte-material-icons/ExitToApp.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import Redirect from "$lib/components/Redirect.svelte";
</script>

<User let:userData>
  {#if userData !== undefined}
    <Redirect to="/app" />
  {/if}
  <div slot="loading" />
  <SignIn slot="signed-out" />
</User>
