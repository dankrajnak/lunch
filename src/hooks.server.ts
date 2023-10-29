import authenticateUser from "$lib/server/authenticateUser";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/app")) {
    const token = event.cookies.get("lunch");

    if (!token || !(await authenticateUser({ token }))) {
      throw redirect(303, "/");
    }
  }

  // If going to the homepage and the user is logged in, redirect to the app
  if (event.url.pathname === "/") {
    const token = event.cookies.get("lunch");

    if (token && (await authenticateUser({ token }))) {
      throw redirect(303, "/app");
    }
  }
  return resolve(event);
};
