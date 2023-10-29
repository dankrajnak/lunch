import type { Place } from "@googlemaps/google-maps-services-js";
import { PUBLIC_GOOGLE_API_ID } from "$env/static/public";

export type LunchPlace = {
  opening_hours: Omit<google.maps.places.PlaceOpeningHours, "isOpen">;
  photos: {
    getUrl: (opts: { maxWidth: number; maxHeight: number }) => string;
  }[];
  formatted_address: string;
  url: string;
  name: string;
  place_id: string;
};

export const PlaceResultToLunchPlace = (
  result: google.maps.places.PlaceResult
): LunchPlace => ({
  opening_hours: result.opening_hours!,
  photos: result.photos!,
  formatted_address: result.formatted_address!,
  url: result.url!,
  name: result.name!,
  place_id: result.place_id!,
});

export const PlaceDetailsResponseToLunchPlace = (
  response: Place
): LunchPlace => ({
  opening_hours: {
    ...response.opening_hours,
    periods: response.opening_hours?.periods.map((period) => {
      return {
        open: {
          day: period.open.day,
          hours: period.open.time
            ? parseInt(period.open.time.substring(0, 2), 10)
            : 0,
          minutes: period.open.time
            ? (period.open.time.substring(3, 5), 10)
            : 0,
          time: period.open.time!,
        },
        ...(period.close?.time
          ? {
              day: period.close.day,
              hours: parseInt(period.close.time.substring(0, 2), 10),
              minutes: parseInt(period.close.time.substring(3, 5), 10),
              time: period.close.time,
            }
          : {}),
      };
    }),
  },
  photos: response.photos!.map((photo) => ({
    getUrl: ({ maxWidth, maxHeight }) =>
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&maxHeight=${maxHeight}&photo_reference=${photo.photo_reference}&key=${PUBLIC_GOOGLE_API_ID}`,
  })),
  formatted_address: response.formatted_address!,
  url: response.url!,
  name: response.name!,
  place_id: response.place_id!,
});
