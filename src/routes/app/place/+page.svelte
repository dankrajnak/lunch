<script lang="ts">
  import { db } from "$lib/client/firebase";
  import { collectionStore } from "sveltefire";

  const places = collectionStore<{ name: string; id: string }>(db, `places`);
  $: placesSorted = $places.toSorted((a, b) => a.name.localeCompare(b.name));
</script>

<div class="container mt-5">
  <h1 class="h1 mb-5">Places ({$places.length})</h1>
  <div class="table-container">
    <!-- Native Table Element -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {#each placesSorted as place}
          <tr>
            <td>{place.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
