import { ChannelRow } from "@/components/ui/ChannelRow";
import { ContactForm } from "@/components/ui/ContactForm";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { EmergencyCard } from "@/components/ui/EmergencyCard";
import { channelsTitle, contactChannels } from "@/content/contact";

export function ContactMessage() {
  return (
    <section
      id="message"
      className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-10 px-5 pt-6 pb-16 nav:px-7 nav:pb-24"
    >
      <CornerFrame className="bg-linear-to-b from-card-from to-card-to p-[clamp(24px,4vw,44px)] shadow-hero-frame">
        <ContactForm />
      </CornerFrame>

      <div className="flex flex-col gap-[22px]">
        <EmergencyCard />
        <div className="flex flex-col gap-3">
          <span className="font-display text-[13px] tracking-[0.2em] text-subtle">
            {channelsTitle}
          </span>
          <div className="flex flex-col gap-2.5">
            {contactChannels.map((channel) => (
              <ChannelRow key={channel.id} channel={channel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
