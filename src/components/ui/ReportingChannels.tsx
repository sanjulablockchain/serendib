import Link from "next/link";
import { linkProps } from "@/lib/links";
import { hitArea } from "@/lib/styles";

type Channel = { label: string; text: string; href: string };

/** Labelled list of ways to reach the Compliance Department. */
export function ReportingChannels({ channels }: { channels: Channel[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {channels.map((channel) => (
        <li
          key={channel.label}
          className="flex flex-col gap-1 border-l-2 border-line-strong pl-4 text-[18px] leading-[1.5] sm:flex-row sm:flex-wrap sm:gap-x-3"
        >
          <strong className="font-semibold text-fg">{channel.label}:</strong>
          <Link
            href={channel.href}
            className={`${hitArea} break-words text-gold-bright hover:text-gold-pale`}
            {...linkProps(channel.href)}
          >
            {channel.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
