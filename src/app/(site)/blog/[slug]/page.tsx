import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { ArticleFooter } from "@/components/sections/ArticleFooter";
import { ArticleHero } from "@/components/sections/ArticleHero";
import { articles, getArticle } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <ArticleHero article={article} />
      <ArticleBody blocks={article.body} />
      <ArticleFooter />
    </>
  );
}
