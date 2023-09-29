import { fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";
import { db } from "$lib/server/firebase-admin";

const postSchema = z.object({ content: z.string() });
export const actions = {
  default: async (event) => {
    const formDataa = Object.fromEntries(await event.request.formData());
    const req = postSchema.safeParse(formDataa);
    if (!req.success) {
      return fail(400, { errors: req.error });
    }
    await db.collection("posts").add({
      content: req.data.content,
    });
    // return json({ success: true });
  },
  // TODO log the user in
} satisfies Actions;
