<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { docStore, getFirebaseContext } from "sveltefire";
  import type { User } from "firebase/auth";
  import { db } from "$lib/client/firebase";
  import Redirect from "./Redirect.svelte";
  import { page } from "$app/stores";
  import Internet from "$lib/Internet";

  import { withParams } from "$lib/UrlHelper";
  import { goto } from "$app/navigation";

  type UserData = { firstName: string; lastName: string };

  const firebase = getFirebaseContext();
  const dispatch = createEventDispatcher();
  const auth = firebase.auth!;
  let user: User | null | undefined = undefined;
  onMount(() => {
    const authUnsub = auth.onAuthStateChanged(async (u) => {
      if (u) {
        await Internet.setToken({ uid: u.uid, token: await u.getIdToken() });
      } else {
        // Clear the token
        await Internet.deleteToken();
        // Redirect the user to base page
        goto("/");
      }
      user = u;
      dispatch("user", { user });
    });
    const refreshUnsub = auth.onIdTokenChanged(async (u) => {
      if (u) {
        await Internet.setToken({ uid: u.uid, token: await u.getIdToken() });
      }
    });
    return () => {
      authUnsub();
      refreshUnsub();
    };
  });

  $: userData = user ? docStore<UserData>(db, `users/${user.uid}`) : undefined;

  const signOut = () => auth.signOut();
</script>

{#if user === undefined || (user != undefined && $userData === undefined)}
  <slot name="loading" />
{:else if user != undefined && $userData === null}
  <Redirect
    to={withParams(new URL("./justASec", $page.url).toString(), {
      ref: $page.url.toString(),
    })}
  />
{:else if user != null}
  <slot {user} {auth} {signOut} userData={$userData} />
{:else}
  <slot name="signed-out" />
{/if}
