import { auth } from "$lib/server/firebase-admin";
import { fail, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { z } from "zod";

const schema = z.object({ uid: z.string(), token: z.string() });
export const POST: RequestHandler = async (event) => {
  const formData = await event.request.json();
  const req = schema.safeParse(formData);
  if (!req.success) {
    throw fail(400, { message: req.error.message });
  }

  const { token, uid } = req.data;
  const decodedToken = await auth.verifyIdToken(token);
  if (decodedToken.uid !== uid) {
    throw fail(403, { message: "Invalid request" });
  }
  event.cookies.set("lunch", token, { httpOnly: true, sameSite: true });

  return json({});
};

export const DELETE: RequestHandler = async (event) => {
  event.cookies.delete("lunch");
  return json({});
};
