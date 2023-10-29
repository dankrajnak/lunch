import { derived } from "svelte/store";
import { page } from "$app/stores";

export const currentRedirect = derived(page, ($value) =>
  $value.url.searchParams.get("ref")
);
