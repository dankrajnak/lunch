<script lang="ts">
  import Place from "$lib/components/Place.svelte";
  import { PlaceDetailsResponseToLunchPlace } from "$lib/types/LunchPlace";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container py-8 flex justify-center">
  <div>
    <h1 class="h1 mb-5">Friday's Pick:</h1>
    <Place place={PlaceDetailsResponseToLunchPlace(data.lunchChoice)} />
  </div>
</div>
