<script>
  import { db as firestore, auth, storage } from "$lib/client/firebase";
  import { FirebaseApp } from "sveltefire";

  import "../app.css";
  import { AppShell } from "@skeletonlabs/skeleton";
  import Nav from "$lib/components/Nav.svelte";
</script>

<!-- @ts-expect-error -->
<FirebaseApp {firestore} {auth} {storage}>
  <AppShell slotPageContent="min-h-ful dark:bg-black/50">
    <Nav slot="pageHeader" />
    <slot />
  </AppShell>
</FirebaseApp>
