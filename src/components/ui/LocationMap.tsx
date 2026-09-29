"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import { cn } from "@/lib/cn";
import { directionsLinks } from "@/lib/directions";
import type { OfficeLocation } from "@/types";

const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

type PopupCopy = { office: string; title: string; google: string; apple: string };

// Leaflet's stylesheet is unlayered, so it beats Tailwind layers. The `!` modifier lets our
// theme tokens win, so the controls follow light and dark mode.
const chrome = [
  "[&_.leaflet-tile-pane]:[filter:var(--map-filter)]",
  "[&_.leaflet-bar]:border-0! [&_.leaflet-bar]:shadow-ring!",
  "[&_.leaflet-bar_a]:size-11! [&_.leaflet-bar_a]:border-edge! [&_.leaflet-bar_a]:bg-btn-from!",
  "[&_.leaflet-bar_a]:text-[22px]! [&_.leaflet-bar_a]:leading-[42px]! [&_.leaflet-bar_a]:text-label!",
  "[&_.leaflet-bar_a:hover]:bg-btn-to! [&_.leaflet-bar_a:hover]:text-gold-bright!",
  "[&_.leaflet-control-attribution]:bg-rail-bg! [&_.leaflet-control-attribution]:text-subtle!",
  "[&_.leaflet-control-attribution_a]:text-gold-bright!",
  "[&_.leaflet-popup-content-wrapper]:rounded-none! [&_.leaflet-popup-content-wrapper]:border!",
  "[&_.leaflet-popup-content-wrapper]:border-line-strong! [&_.leaflet-popup-content-wrapper]:bg-menu-to!",
  "[&_.leaflet-popup-content-wrapper]:text-fg! [&_.leaflet-popup-content-wrapper]:shadow-panel!",
  "[&_.leaflet-popup-content]:m-0! [&_.leaflet-popup-tip]:bg-menu-to!",
  "[&_.leaflet-popup-close-button]:size-11! [&_.leaflet-popup-close-button]:p-0!",
  "[&_.leaflet-popup-close-button]:text-[24px]! [&_.leaflet-popup-close-button]:leading-[44px]!",
  "[&_.leaflet-popup-close-button]:text-gold-bright!",
].join(" ");

const directionButton =
  "flex min-h-11 flex-1 items-center justify-center border border-edge bg-linear-to-b from-btn-from to-btn-to px-4 py-3 text-center font-display text-[12px] tracking-[0.16em] whitespace-nowrap text-label! transition-shadow hover:border-gold-bright hover:text-gold-bright! hover:shadow-glow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright";

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text?: string) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

function directionLink(href: string, label: string) {
  const link = element("a", directionButton, label);
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

/** Built from DOM nodes and textContent, never an HTML string. */
function buildPopup(location: OfficeLocation, copy: PopupCopy) {
  const links = directionsLinks(location);
  const root = element("div", "flex flex-col gap-3 p-4 pr-11 font-sans");

  const address = element("address", "m-0 text-[17px] leading-normal text-soft not-italic");
  address.append(
    location.street,
    document.createElement("br"),
    `${location.city}, ${location.region} ${location.postalCode}`,
  );

  const buttons = element("div", "flex flex-col gap-2 xs:flex-row");
  buttons.append(directionLink(links.google, copy.google), directionLink(links.apple, copy.apple));

  root.append(
    element("span", "font-display text-[12px] tracking-[0.2em] text-gold-bright", copy.title),
    element(
      "strong",
      "font-display text-[18px] leading-tight font-medium text-heading",
      copy.office,
    ),
    address,
    buttons,
  );
  return root;
}

export function LocationMap({
  location,
  label,
  popup,
}: {
  location: OfficeLocation;
  label: string;
  popup: PopupCopy;
}) {
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
        title: popup.office,
        alt: popup.office,
        icon: L.icon({
          iconUrl: "/icons/leaflet/marker-icon.png",
          iconRetinaUrl: "/icons/leaflet/marker-icon-2x.png",
          shadowUrl: "/icons/leaflet/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      })
        .bindPopup(buildPopup(location, popup), {
          minWidth: 200,
          // Leave room for the zoom buttons on the left, so a narrow map never hides the popup.
          maxWidth: Math.max(200, Math.min(340, container.current.clientWidth - 96)),
          autoPanPaddingTopLeft: [72, 16],
          autoPanPaddingBottomRight: [16, 16],
        })
        .addTo(map);

      // Keep page scrolling smooth on touch and wheel until the map is focused.
      map.on("focus", () => map?.scrollWheelZoom.enable());
      map.on("blur", () => map?.scrollWheelZoom.disable());
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [location, popup]);

  return (
    <div
      ref={container}
      role="region"
      aria-label={label}
      className={cn(
        // Leaflet adds its own class to this element, so the overrides sit on it directly.
        "relative h-full min-h-[440px] w-full overflow-hidden border border-line-strong bg-pill! font-sans! nav:min-h-[352px]",
        chrome,
      )}
    />
  );
}
