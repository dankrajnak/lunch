<script lang="ts">
  import { onMount } from "svelte";
  import Place from "$lib/components/Place.svelte";
  import { PlaceResultToLunchPlace } from "$lib/types/LunchPlace";
  import { PUBLIC_GOOGLE_API_ID } from "$env/static/public";

  // export let data: PageData;

  // Add autocomplete
  let autoCompleteInput: HTMLInputElement;

  let place: google.maps.places.PlaceResult;
  onMount(() => {
    const placesApiPromise = google.maps.importLibrary("places");
    let autoCompleteListener: google.maps.MapsEventListener;
    placesApiPromise.then((resp) => {
      const { Autocomplete } = resp as google.maps.PlacesLibrary;
      const columbus = { lat: 39.9612, lng: -82.9988 };
      const autoComplete = new Autocomplete(autoCompleteInput, {
        bounds: {
          north: columbus.lat + 0.1,
          south: columbus.lat - 0.1,
          east: columbus.lng + 0.1,
          west: columbus.lng - 0.1,
        },
        componentRestrictions: { country: "us" },
        types: ["restaurant", "cafe", "store"],
        fields: [
          "opening_hours",
          "photos",
          "formatted_address",
          "url",
          "name",
          "place_id",
        ],
      });
      autoCompleteListener = autoComplete.addListener("place_changed", () => {
        place = autoComplete.getPlace();
      });
    });
    return () => {
      autoCompleteListener?.remove();
    };
  });
</script>

<svelte:head>
  <!-- this is just stuff from https://developers.google.com/maps/documentation/javascript/places#find_place_requests -->
  {@html `
  <!-- prettier-ignore -->
  <script>
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=\`https://maps.\${c}apis.com/maps/api/js?\`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
      key: "${PUBLIC_GOOGLE_API_ID}",
      v: "weekly",
    });
  </script>
`}
</svelte:head>

<div class="flex flex-col my-10 min-h-full item-center">
  <div class="container space-y-4 w-1/2">
    <h1 class="h1">Add a Place</h1>
    <input
      bind:this={autoCompleteInput}
      type="text"
      placeholder="Search for a place"
      class="w-full input variant-form-material"
    />
    {#if place}
      <Place place={PlaceResultToLunchPlace(place)} showAddButton />
    {/if}
  </div>
</div>

<style>
  :global(.pac-container) {
    @apply bg-surface-900 text-white;
  }

  :global(.pac-item) {
    @apply text-white px-2 py-3 flex justify-between;
  }

  :global(.pac-item:not(.pac-item-selected)) {
    @apply bg-surface-hover-token;
  }

  :global(.pac-item-selected, .pac-item-selected:hover) {
    @apply bg-surface-active-token;
  }

  :global(.pac-icon) {
    display: none;
  }

  :global(.pac-item-query, .pac-item span) {
    @apply text-white text-sm font-bold;
  }

  :global(.pac-item span:not(.pac-item-query):not(.pac-matched)) {
    @apply text-white/50 font-thin text-sm ml-3;
  }

  :global(.pac-item-query .pac-matched) {
    @apply text-primary-400 font-extrabold text-sm;
  }

  :global(.pac-container::after) {
    display: none;
  }
</style>
