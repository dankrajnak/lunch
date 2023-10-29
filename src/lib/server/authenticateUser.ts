import { z } from "zod";
import { auth } from "$lib/server/firebase-admin";
const schema = z.object({ uid: z.optional(z.string()), token: z.string() });

const authenticateUser = async (
  opts: z.infer<typeof schema>
): Promise<boolean> => {
  try {
    const { uid, token } = schema.parse(opts);
    const decodedToken = await auth.verifyIdToken(token);
    return uid ? decodedToken.uid !== uid : true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default authenticateUser;
