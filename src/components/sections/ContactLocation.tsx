import { Button } from "@/components/ui/Button";
import { LocationMap } from "@/components/ui/LocationMap";
import { contactLocation, locations } from "@/content/contact";

export function ContactLocation() {
  const [location] = locations;

  return (
    <section id="directions" className="mx-auto max-w-site px-5 pb-20 nav:px-7 nav:pb-28">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] border border-line-bold bg-linear-120 from-panel-from to-panel-to shadow-panel">
        <div className="flex flex-col justify-center gap-5 p-[clamp(28px,4vw,52px)]">
          <div className="flex items-center gap-3.5">
            <span aria-hidden="true" className="h-px w-12 bg-linear-to-r from-gold-clear to-gold" />
            <span className="font-display text-[13px] tracking-[0.22em] text-gold-bright">
              {contactLocation.eyebrow}
            </span>
          </div>
          <h2 className="m-0 text-[clamp(26px,3vw,38px)] leading-[1.18] font-medium text-balance">
            {contactLocation.title}
          </h2>
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex size-12 flex-none items-center justify-center rounded-full border-2 border-gold bg-radial-[circle_at_40%_35%] from-moon to-disc-to text-[19px] text-gold-bright shadow-moon"
            >
              ⌖
            </span>
            <address className="m-0 text-[clamp(18px,2.2vw,21px)] leading-[1.5] text-soft not-italic">
              {location.street}
              <br />
              {location.city}, {location.region} {location.postalCode}
            </address>
          </div>
          <Button href={location.directionsHref} variant="dark" size="md" className="self-start">
            {contactLocation.directions}
          </Button>
        </div>
        <div className="border-t border-line-soft p-3.5 nav:border-t-0 nav:border-l">
          <LocationMap location={location} label={contactLocation.mapLabel} />
        </div>
      </div>
    </section>
  );
}
