<script>
  import { db as firestore, auth, storage } from "$lib/client/firebase";
  import { FirebaseApp } from "sveltefire";

  import "../app.css";
</script>

<!-- @ts-expect-error -->
<FirebaseApp {firestore} {auth} {storage}>
  <slot />
</FirebaseApp>
