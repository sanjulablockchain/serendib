import { describe, expect, it } from "vitest";
import { directionsLinks } from "@/lib/directions";

const office = {
  street: "504 S Sierra Madre Blvd",
  city: "Pasadena",
  region: "CA",
  postalCode: "91107",
};

describe("directionsLinks", () => {
  it("builds a Google Maps directions link from the street address", () => {
    expect(directionsLinks(office).google).toBe(
      "https://www.google.com/maps/dir/?api=1&destination=504%20S%20Sierra%20Madre%20Blvd%2C%20Pasadena%2C%20CA%2091107",
    );
  });

  it("builds an Apple Maps driving directions link from the street address", () => {
    expect(directionsLinks(office).apple).toBe(
      "https://maps.apple.com/?daddr=504%20S%20Sierra%20Madre%20Blvd%2C%20Pasadena%2C%20CA%2091107&dirflg=d",
    );
  });

  it("encodes characters that could add or break query parameters", () => {
    const links = directionsLinks({ ...office, street: "5 A&B #2 ?x=1" });
    for (const href of [links.google, links.apple]) {
      const query = href.split("?")[1];
      expect(query).not.toMatch(/#/);
      expect(query).toContain("5%20A%26B%20%232%20%3Fx%3D1");
    }
    expect(new URL(links.google).searchParams.get("destination")).toBe(
      "5 A&B #2 ?x=1, Pasadena, CA 91107",
    );
    expect(new URL(links.apple).searchParams.get("daddr")).toBe(
      "5 A&B #2 ?x=1, Pasadena, CA 91107",
    );
  });
});
