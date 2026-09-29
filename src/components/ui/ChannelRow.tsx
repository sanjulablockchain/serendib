import { linkProps } from "@/lib/links";
import type { ContactChannel } from "@/types";

const row =
  "relative flex min-h-[72px] items-center gap-4 border border-line-mid bg-linear-to-r from-row-from to-row-to px-[18px] py-3.5 transition-all duration-200";
const linkRow =
  "hover:border-gold-bright hover:shadow-row-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright";

/** A framed contact channel. Renders a link when the channel has an href, otherwise static text. */
export function ChannelRow({ channel }: { channel: ContactChannel }) {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="flex size-11 flex-none items-center justify-center rounded-full border-2 border-gold bg-radial-[circle_at_40%_35%] from-moon to-disc-to text-[18px] text-gold-bright shadow-moon"
      >
        {channel.glyph}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="font-display text-[11px] tracking-[0.18em] text-subtle">
          {channel.label}
        </span>
        <span className="font-display text-[16px] tracking-[0.03em] [overflow-wrap:anywhere] text-heading">
          {channel.value}
        </span>
      </span>
      {channel.href && (
        <span aria-hidden="true" className="font-display text-[14px] text-gold-bright">
          ▸
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute right-[3px] bottom-[3px] h-1.5 w-2.5 border-r border-b border-halo-strong"
      />
    </>
  );

  return channel.href ? (
    <a href={channel.href} className={`${row} ${linkRow}`} {...linkProps(channel.href)}>
      {content}
    </a>
  ) : (
    <div className={row}>{content}</div>
  );
}
