"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ProviderAvatar } from "@/components/ui/ProviderAvatar";
import { profileDialog } from "@/content/our-doctors";
import { site } from "@/content/site";
import type { DoctorArea, Provider } from "@/types";

type ProviderDialogProps = {
  provider: Provider | null;
  areaNames: Map<string, string>;
  onClose: () => void;
  onSelectArea: (area: DoctorArea["id"]) => void;
};

/** Modal provider profile built on the native dialog element (focus trap and Escape included). */
export function ProviderDialog({
  provider,
  areaNames,
  onClose,
  onSelectArea,
}: ProviderDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (provider && !dialog.open) dialog.showModal();
    if (!provider && dialog.open) dialog.close();
    document.documentElement.style.overflow = provider ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [provider]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={provider?.name}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto max-h-[calc(100dvh-40px)] w-[min(760px,calc(100%-40px))] overflow-auto border border-frame bg-page bg-linear-to-br from-panel-from to-panel-to p-0 text-fg shadow-dialog backdrop:bg-scrim backdrop:backdrop-blur-xs"
    >
      {provider && (
        <div className="relative flex flex-col gap-[22px] p-[clamp(24px,4vw,40px)]">
          <button
            type="button"
            onClick={onClose}
            aria-label={profileDialog.close}
            className="absolute top-3.5 right-3.5 flex size-11 cursor-pointer items-center justify-center rounded-full border border-edge text-[18px] leading-none text-gold-bright hover:border-gold-bright"
          >
            <span aria-hidden="true">✕</span>
          </button>

          <div className="flex flex-wrap items-center gap-6 pr-12">
            <ProviderAvatar
              provider={provider}
              sizes="132px"
              className="size-[132px]"
              initialsClassName="text-[38px]"
            />
            <div className="flex min-w-[200px] flex-1 flex-col gap-2">
              <span className="font-display text-[11px] tracking-[0.22em] text-gold-bright">
                {profileDialog.badge}
              </span>
              <h2 className="m-0 text-[clamp(24px,3vw,32px)] leading-[1.1] font-normal">
                {provider.name}
              </h2>
              <span className="font-display text-[13px] tracking-[0.14em] text-subtle">
                {provider.credentials} · {profileDialog.specialty}
              </span>
            </div>
          </div>

          <span aria-hidden="true" className="h-px bg-(image:--gradient-rule-strong)" />

          {provider.bio && (
            <p className="m-0 text-[19px] leading-[1.65] text-pretty text-soft">{provider.bio}</p>
          )}

          <div className="flex flex-col gap-2.5">
            <span className="font-display text-[12px] tracking-[0.18em] text-gold-bright">
              {profileDialog.seesAt}
            </span>
            <div className="flex flex-wrap gap-2">
              {provider.areas.map((areaId) => (
                <button
                  key={areaId}
                  type="button"
                  onClick={() => onSelectArea(areaId)}
                  className="min-h-11 cursor-pointer border border-line-mid bg-linear-to-r from-row-from to-row-to px-3.5 py-2 font-display text-[12px] tracking-[0.1em] text-fg hover:border-gold-bright"
                >
                  {areaNames.get(areaId) ?? areaId}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3.5 pt-1">
            <Button href={provider.bookingUrl || profileDialog.fallbackBookHref}>
              {profileDialog.book}
            </Button>
            <Button href={site.contact.phoneHref} variant="dark">
              {`CALL ${site.contact.phone}`}
            </Button>
          </div>
        </div>
      )}
    </dialog>
  );
}
