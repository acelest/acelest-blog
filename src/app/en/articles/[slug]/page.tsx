import { getArticleBySlug } from "@/app/lib/articles";
import { redirect } from "next/navigation";

export default async function ArticleRedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    // Check if the article exists
    await getArticleBySlug(params.slug, ["title"]);

    // If yes, redirect to the correct URL
    redirect(`/en/articles/post/${params.slug}`);
  } catch (error) {
    // If the article doesn't exist, redirect to the articles page
    redirect("/en/articles");
  }
}
