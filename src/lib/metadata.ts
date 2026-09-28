import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description?: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description: description ?? site.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: description ?? site.description,
      url: path,
      siteName: site.name,
      type: "website",
    },
  };
}
