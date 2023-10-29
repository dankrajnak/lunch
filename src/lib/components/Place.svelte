<script lang="ts">
  import Mapmarker from "svelte-material-icons/MapMarker.svelte";
  import Map from "svelte-material-icons/Map.svelte";
  import ClockCheck from "svelte-material-icons/ClockCheck.svelte";
  import ClockAlert from "svelte-material-icons/ClockAlert.svelte";
  import Plus from "svelte-material-icons/Plus.svelte";
  import Check from "svelte-material-icons/Check.svelte";
  import { auth, db } from "$lib/client/firebase";
  import { doc, setDoc } from "firebase/firestore";
  import { collectionStore, userStore } from "sveltefire";
  import type { LunchPlace } from "$lib/types/LunchPlace";

  export let place: LunchPlace;
  export let showAddButton = false;

  // Whether it's open before 2pm on Friday
  $: openOnFriday = !!place.opening_hours?.periods?.find(
    (period) =>
      period.open.day <= 5 &&
      (!period.close || period.close.day >= 5) &&
      period.open.hours <= 14
  );

  let addPlacePromise: Promise<unknown>;

  const user = userStore(auth);

  $: addPlace = async () => {
    const add = async (p: LunchPlace) => {
      if (!p.place_id) {
        throw new Error("Place has no place_id");
      }
      if (!$user) {
        throw new Error("User is not logged in");
      }
      await setDoc(doc(db, "places", p.place_id), {
        name: p.name,
        id: p.place_id,
        added_by: $user.uid,
      });
    };
    if (!addPlacePromise) {
      addPlacePromise = add(place);
    }
    await addPlacePromise;
  };

  const places = collectionStore<{ name: string; id: string }>(db, `places`);
  $: placeAdded = !!$places.find((p) => p.id === place.place_id);
</script>

<div class="card overflow-hidden shadow-lg max-w-3xl">
  {#if place.photos}
    <header
      class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-4"
    >
      {#each place.photos as photo, i}
        <img
          class="snap-start shrink-0 card w-40 md:w-80 text-center object-cover h-80"
          src={photo.getUrl({
            maxHeight: 320,
            maxWidth: 320 /* 20 rem, which is h-80*/,
          })}
          alt={`${place.name} photo #${i}`}
        />
      {/each}
    </header>
  {/if}
  <div class="p-4 space-y-4">
    <!-- <h2 class="h6">Restaurant</h2> -->
    <h1 class="h3">{place.name}</h1>
    <div
      class={`flex items-center space-x-2 ${
        openOnFriday ? "" : "text-error-400"
      } `}
    >
      {#if openOnFriday}
        <ClockCheck class="w-6 h-6" />
      {:else}
        <ClockAlert class="w-6 h-6" />
      {/if}
      <span class="font-extralight">
        {place.opening_hours?.weekday_text?.at(4) ?? ""}
      </span>
    </div>
    <div class="flex items-center space-x-2">
      <Mapmarker class="w-6 h-6" />
      <span class="flex items-center font-extralight">
        {place.formatted_address}
      </span>
    </div>
  </div>
  <hr />
  <footer class="flex justify-end space-x-4 p-4">
    <a
      href={place.url}
      target="_blank"
      rel="noopener noreferer"
      class="btn variant-ghost shadow"
    >
      <Map class="mr-2" />
      Map
    </a>
    {#if showAddButton}
      {#if placeAdded}
        <button
          class="btn variant-filled"
          disabled
          title="This place has been added"
        >
          <Check />
          Added
        </button>
      {:else}
        {#await addPlacePromise}
          <button class="btn variant-filled" disabled>
            <Plus />
            Adding
          </button>
        {:then _}
          <button class="btn variant-filled" on:click={() => addPlace()}>
            <Plus />
            Add
          </button>
        {/await}
      {/if}
    {/if}
  </footer>
</div>
