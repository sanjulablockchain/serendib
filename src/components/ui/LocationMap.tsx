"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { OfficeLocation } from "@/types";

const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

const chrome = [
  "[&_.leaflet-tile-pane]:[filter:var(--map-filter)]",
  "[&_.leaflet-container]:bg-pill [&_.leaflet-container]:font-sans",
  "[&_.leaflet-bar]:border-0 [&_.leaflet-bar]:shadow-ring",
  "[&_.leaflet-bar_a]:border-edge [&_.leaflet-bar_a]:bg-btn-from [&_.leaflet-bar_a]:text-label",
  "[&_.leaflet-bar_a:hover]:bg-btn-to [&_.leaflet-bar_a:hover]:text-gold-bright",
  "[&_.leaflet-control-attribution]:bg-rail-bg [&_.leaflet-control-attribution]:text-subtle",
  "[&_.leaflet-control-attribution_a]:text-gold-bright",
].join(" ");

export function LocationMap({ location, label }: { location: OfficeLocation; label: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: LeafletMap | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !container.current) return;

      const center: [number, number] = [location.lat, location.lng];
      map = L.map(container.current, { scrollWheelZoom: false }).setView(center, location.zoom);
      L.tileLayer(TILE_URL, { maxZoom: 19, attribution: ATTRIBUTION }).addTo(map);
      L.marker(center, {
        title: location.name,
        alt: location.name,
        icon: L.icon({
          iconUrl: "/icons/leaflet/marker-icon.png",
          iconRetinaUrl: "/icons/leaflet/marker-icon-2x.png",
          shadowUrl: "/icons/leaflet/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      }).addTo(map);

      // Keep page scrolling smooth on touch and wheel until the map is focused.
      map.on("focus", () => map?.scrollWheelZoom.enable());
      map.on("blur", () => map?.scrollWheelZoom.disable());
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [location]);

  return (
    <div
      ref={container}
      role="region"
      aria-label={label}
      className={`relative h-full min-h-[352px] w-full overflow-hidden border border-line-strong bg-pill ${chrome}`}
    />
  );
}
