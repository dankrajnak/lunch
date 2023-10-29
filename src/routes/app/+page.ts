import type { PageLoad } from "./$types";
export const load: PageLoad = async ({ fetch }) => {
  const resp = await fetch("/app/lunch-choice", { method: "GET" });
  const lunchChoice = await resp.json();
  return {
    lunchChoice,
  };
};
