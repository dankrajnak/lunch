<script lang="ts">
  import { auth } from "$lib/client/firebase";
  import SubmitButton from "$lib/components/SubmitButton.svelte";
  import { db } from "$lib/client/firebase";
  import { AppBar, AppShell } from "@skeletonlabs/skeleton";

  import SignOutLogo from "svelte-material-icons/ExitToApp.svelte";
  import { userStore } from "sveltefire";
  import { doc, setDoc } from "firebase/firestore";
  import { currentRedirect } from "$lib/stores/redirectStore";
  import { goto } from "$app/navigation";

  let firstName = "";
  let lastName = "";
  const user = userStore(auth);
  const redirect = $currentRedirect;
  const handleSubmit = async () => {
    if ($user) {
      await setDoc(doc(db, "users", $user.uid), {
        firstName,
        lastName,
      });
      if (redirect) {
        goto(redirect);
      }
    }
  };
</script>

<AppShell class="min-h-screen">
  <AppBar slot="header">
    <span slot="lead" />
    <svelte:fragment slot="trail">
      <buttton class="btn p-0" title="Sign Out">
        <SignOutLogo />
      </buttton>
    </svelte:fragment>
  </AppBar>

  <div
    class="flex items-center flex-col h-screen justify-center dark:bg-black/50"
  >
    <form method="post" on:submit|preventDefault={handleSubmit}>
      <div class="w-96 flex items-cente flex-col space-y-5">
        <div class="text-center">
          <h1 class="h1 leading-tight font-bold text-center">Just a Sec</h1>
          <span>Need some quick info</span>
        </div>

        <input
          class="input variant-form-material"
          placeholder="First Name"
          name="firstName"
          bind:value={firstName}
          required
        />
        <input
          class="input variant-form-material"
          placeholder="Last Name"
          name="lastName"
          bind:value={lastName}
          required
        />
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  </div>
</AppShell>
