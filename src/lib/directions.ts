import type { OfficeLocation } from "@/types";

type Address = Pick<OfficeLocation, "street" | "city" | "region" | "postalCode">;

/**
 * Directions links for Google Maps and Apple Maps. They use the street address rather than
 * coordinates, because both services geocode a full address more accurately than our marker.
 */
export function directionsLinks({ street, city, region, postalCode }: Address) {
  const destination = encodeURIComponent(`${street}, ${city}, ${region} ${postalCode}`);
  return {
    google: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    apple: `https://maps.apple.com/?daddr=${destination}&dirflg=d`,
  };
}
