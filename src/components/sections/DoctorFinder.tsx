"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ProviderAvatar } from "@/components/ui/ProviderAvatar";
import { ProviderDialog } from "@/components/ui/ProviderDialog";
import { areas, finder, legacyAreaHashes, providers } from "@/content/our-doctors";
import { cn } from "@/lib/cn";

const ALL = "all";
const numerals: [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function toRoman(value: number) {
  let out = "";
  for (const [amount, symbol] of numerals) {
    while (value >= amount) {
      out += symbol;
      value -= amount;
    }
  }
  return out;
}

const areaNames = new Map(areas.map((area) => [area.id, area.name]));
const tabs = [{ id: ALL, name: finder.allAreas }, ...areas];
const areaCounts = new Map(
  tabs.map((tab) => [
    tab.id,
    tab.id === ALL ? providers.length : providers.filter((p) => p.areas.includes(tab.id)).length,
  ]),
);

// Providers with a photo first, then alphabetical.
const sorted = [...providers].sort(
  (a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)) || a.name.localeCompare(b.name),
);

export function DoctorFinder() {
  const [areaId, setAreaId] = useState(ALL);
  const [query, setQuery] = useState("");
  const [profileId, setProfileId] = useState<string | null>(null);

  const selectArea = useCallback((id: string) => {
    setAreaId(id);
    setQuery("");
    setProfileId(null);
    window.history.replaceState(null, "", id === ALL ? window.location.pathname : `#${id}`);
  }, []);

  // Deep links such as /our-doctors#pasadena (or the older #van) pick the area on load.
  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash.slice(1);
      const id = legacyAreaHashes[raw] ?? raw;
      if (!areaNames.has(id)) return;
      setAreaId(id);
      setQuery("");
      document.getElementById("finder")?.scrollIntoView({ behavior: "smooth" });
    };
    const timer = window.setTimeout(applyHash, 0);
    window.addEventListener("hashchange", applyHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", applyHash);
    };
  }, []);

  const term = query.trim().toLowerCase();
  const list = useMemo(() => {
    if (term) return sorted.filter((p) => p.name.toLowerCase().includes(term));
    return areaId === ALL ? sorted : sorted.filter((p) => p.areas.includes(areaId));
  }, [areaId, term]);

  const activeIndex = tabs.findIndex((tab) => tab.id === areaId);
  const badge = term ? "⌕" : areaId === ALL ? "✦" : toRoman(activeIndex);
  const heading = term ? finder.searchResults : tabs[activeIndex].name;
  const count = `${list.length} ${list.length === 1 ? finder.one : finder.many}${
    areaId === "telehealth" && !term ? ` · ${finder.virtual}` : ` ${finder.available}`
  }`;
  const profile = profileId ? (providers.find((p) => p.id === profileId) ?? null) : null;

  return (
    <section id="finder" className="flex flex-col gap-8 pb-[120px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-14 gap-y-5">
        <div className="flex flex-col gap-3">
          <span
            data-parallax="0.08"
            className="font-display text-[13px] tracking-[0.22em] text-subtle"
          >
            {finder.eyebrow}
          </span>
          <h2
            data-parallax="0.04"
            className="m-0 text-[clamp(30px,3.6vw,44px)] leading-[1.15] font-medium text-balance"
          >
            {finder.title}
          </h2>
        </div>
        <p className="m-0 text-[19px] leading-[1.6] text-pretty text-soft">{finder.description}</p>
      </div>

      <div className="flex items-center gap-3.5 border border-line-strong bg-linear-to-r from-row-from to-row-to px-[18px] py-1 shadow-field">
        <span aria-hidden="true" className="text-[18px] text-gold-bright">
          ⌕
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          maxLength={80}
          placeholder={finder.searchPlaceholder}
          aria-label={finder.searchLabel}
          className="min-h-11 min-w-0 flex-1 border-0 bg-transparent py-3.5 font-sans text-[19px] text-heading outline-none placeholder:text-subtle [&::-webkit-search-cancel-button]:appearance-none"
        />
        {term && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="min-h-11 cursor-pointer border border-edge px-3 font-display text-[11px] tracking-[0.14em] text-gold-bright hover:border-gold-bright"
          >
            {finder.clear}
          </button>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2 border border-line-mid bg-marquee p-4 xs:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
        {tabs.map((tab) => {
          const active = !term && tab.id === areaId;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={active}
              onClick={() => selectArea(tab.id)}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-between gap-2 border px-3.5 py-3 text-left font-display text-[12px] tracking-[0.1em]",
                active
                  ? "border-gold-pale bg-linear-to-b from-gold-soft to-gold text-on-gold shadow-glow-soft"
                  : "border-line-mid bg-linear-to-r from-row-from to-row-to text-fg hover:border-gold-bright",
              )}
            >
              <span>{tab.name}</span>
              <span className="text-[11px] opacity-80">{areaCounts.get(tab.id)}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft pb-3.5">
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="flex size-12 flex-none items-center justify-center rounded-full border-2 border-gold-pale bg-radial-[circle_at_40%_35%] from-gold-hi to-gold-mid to-70% font-display text-[15px] font-bold text-on-gold shadow-medal"
          >
            {badge}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-display text-[26px] leading-[1.1] text-heading">{heading}</span>
            <span
              aria-live="polite"
              className="font-display text-[12px] tracking-[0.16em] text-subtle"
            >
              {count}
            </span>
          </div>
        </div>
        <span className="font-display text-[12px] tracking-[0.14em] text-gold-bright">
          {finder.syncNote}
        </span>
      </div>

      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-[18px] gap-y-[22px] p-0 xs:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {list.map((provider) => (
          <li key={provider.id} className="flex">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setProfileId(provider.id)}
              className="flex w-full cursor-pointer flex-col items-center gap-3 border border-line-mid bg-linear-to-b from-card-from to-card-to px-3.5 pt-[22px] pb-[18px] text-center hover:border-gold-bright hover:shadow-row-hover"
            >
              <ProviderAvatar
                provider={provider}
                sizes="112px"
                className="size-28"
                initialsClassName="text-[30px]"
              />
              <span className="font-display text-[16px] leading-tight text-balance text-heading">
                {provider.name}
              </span>
              <span className="border border-line-mid px-2.5 py-1 font-display text-[11px] tracking-[0.14em] text-gold-bright">
                {provider.credentials}
              </span>
              <span className="text-[15px] leading-[1.35] text-balance text-subtle">
                {provider.areas.map((id) => areaNames.get(id)).join(" · ")}
              </span>
              <span className="mt-auto pt-1 font-display text-[11px] tracking-[0.16em] text-gold-bright">
                {finder.view}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {list.length === 0 && (
        <p className="m-0 border border-dashed border-line-mid p-7 text-center text-[19px] text-subtle">
          {finder.noResults}
        </p>
      )}

      <ProviderDialog
        provider={profile}
        areaNames={areaNames}
        onClose={() => setProfileId(null)}
        onSelectArea={selectArea}
      />
    </section>
  );
}
