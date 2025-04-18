import { getArticleBySlug } from "@/app/lib/articles";
import { redirect } from "next/navigation";

export default async function ArticleRedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    // On vérifie si l'article existe
    await getArticleBySlug(params.slug, ["title"]);

    // Si oui, on redirige vers la bonne URL
    redirect(`/articles/post/${params.slug}`);
  } catch (error) {
    // Si l'article n'existe pas, on redirige vers la page d'articles
    redirect("/articles");
  }
}
