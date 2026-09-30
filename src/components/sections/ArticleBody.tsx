import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { hitArea } from "@/lib/styles";
import type { ArticleBlock } from "@/types";

type ArticleBodyProps = {
  blocks: ArticleBlock[];
};

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="m-0 mt-4 text-[clamp(22px,2.4vw,28px)] leading-[1.25] font-medium text-balance">
          {block.text}
        </h2>
      );
    case "paragraph":
      return <p className="m-0 text-[18px] leading-[1.65] text-pretty text-soft">{block.text}</p>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className="m-0 flex list-none flex-col gap-3 p-0">
          {block.items.map((item) => (
            <li
              key={item.text}
              className="border-l-2 border-line-strong pl-4 text-[18px] leading-[1.65] text-pretty text-soft"
            >
              {item.term && <strong className="font-semibold text-fg">{item.term}: </strong>}
              {item.text}
            </li>
          ))}
        </List>
      );
    }
    case "contact":
      return (
        <aside className="flex flex-col gap-4 border border-line bg-linear-to-b from-card-from to-card-to px-[26px] py-6">
          <span className="font-display text-[13px] tracking-[0.18em] text-subtle">
            {block.title.toUpperCase()}
          </span>
          <dl className="m-0 flex flex-col gap-3">
            {block.lines.map((line) => (
              <div key={line.label} className="flex flex-col gap-0.5">
                <dt className="font-display text-[12px] tracking-[0.16em] text-subtle">
                  {line.label.toUpperCase()}
                </dt>
                <dd className="m-0 text-[18px] leading-[1.5] break-words text-fg">
                  {line.href ? (
                    <Link
                      href={line.href}
                      className={`${hitArea} text-gold-bright hover:text-gold-pale`}
                    >
                      {line.value}
                    </Link>
                  ) : (
                    line.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      );
  }
}

export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <section className="pb-16 nav:pb-20">
      <Container>
        <div className="flex max-w-[820px] flex-col gap-5">
          {blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </Container>
    </section>
  );
}
