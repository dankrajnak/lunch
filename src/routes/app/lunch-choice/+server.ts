import { db } from "$lib/server/firebase-admin";
import { getNextFriday } from "$lib/utils";
import { Client } from "@googlemaps/google-maps-services-js";

import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { PUBLIC_GOOGLE_API_ID } from "$env/static/public";

const getChosenPlace = async (): Promise<{ placeId: string }> => {
  // check to see if there's a lunch choice for this Friday.
  // if there is, return it.

  // Get the next Friday as a date object
  const nextFriday = getNextFriday();

  const choice = await db.collection("lunch-choices").doc(nextFriday).get();
  if (choice.exists) {
    return { placeId: choice.data()?.place_id };
  } else {
    // if there isn't, get a random place from the list of places
    // and save it to the database.
    const places = await db.collection("places").get();
    const randomPlace =
      places.docs[Math.floor(Math.random() * places.docs.length)];

    await db
      .collection("lunch-choices")
      .doc(nextFriday)
      .set({ place_id: randomPlace.id });

    return { placeId: randomPlace.id };
  }
};

export const GET: RequestHandler = async () => {
  const { placeId } = await getChosenPlace();

  const client = new Client({});

  const resp = await client.placeDetails({
    params: {
      place_id: placeId,
      fields: [
        "opening_hours",
        "photos",
        "formatted_address",
        "url",
        "name",
        "place_id",
      ],
      key: PUBLIC_GOOGLE_API_ID,
    },
  });

  return json(resp.data.result);
};
