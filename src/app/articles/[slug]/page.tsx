import { getArticleBySlug, getArticleSlugs } from "@/app/lib/articles";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import NavBar from "@/components/NavBar";
import { markdownToHtml } from "@/lib/markdown";
import { generateMetadata as generateBaseMetadata } from "@/lib/metadata";
import "highlight.js/styles/github-dark.css";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

// Générer les métadonnées dynamiquement pour chaque article
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    // Récupérer les données de l'article
    const article = getArticleBySlug(params.slug, [
      "title",
      "excerpt",
      "coverImage",
      "category",
      "tags",
      "author",
      "date",
    ]);

    // Générer les métadonnées
    return generateBaseMetadata({
      title: article.title,
      description: article.excerpt,
      keywords: article.tags,
      image: article.coverImage,
      pathname: `/articles/${params.slug}`,
      locale: "fr",
      type: "article",
    });
  } catch (error) {
    // Logging the error for debugging purposes
    console.error("Error generating metadata:", error);
    // En cas d'erreur, retourner des métadonnées par défaut
    return generateBaseMetadata({
      title: "Article",
      pathname: `/articles/${params.slug}`,
      locale: "fr",
    });
  }
}

// Générer les routes statiques pour tous les articles
export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  try {
    // Récupérer les données de l'article pour l'affichage
    const article = getArticleBySlug(params.slug, [
      "title",
      "date",
      "content",
      "excerpt",
      "coverImage",
      "category",
      "readingTime",
      "author",
      "tags",
    ]);

    // Formater la date
    const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Convertir le Markdown en HTML avec notre fonction utilitaire
    const contentHtml = markdownToHtml(article.content);

    return (
      <main className="flex min-h-screen flex-col">
        <NavBar />

        {/* Espace entre navbar et contenu */}
        <div className="mt-20 md:mt-24"></div>

        <div className="container max-w-3xl mx-auto px-4 py-12">
          {/* En-tête de l'article */}
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {article.title}
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <time dateTime={article.date}>{formattedDate}</time>
              <span>•</span>
              <span>{article.readingTime} de lecture</span>
              {article.category && (
                <>
                  <span>•</span>
                  <span>{article.category}</span>
                </>
              )}
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Image de couverture */}
          {article.coverImage && (
            <div className="mb-12">
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Contenu principal - avec styles améliorées pour une meilleure lisibilité */}
          <article
            id="article-content"
            className="prose dark:prose-invert markdown-content
              max-w-none
              mx-auto"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Composant client qui va améliorer les blocs de code */}
          <MarkdownRenderer contentId="article-content" />

          {/* Section auteur */}
          {article.author && (
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Écrit par{" "}
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  {article.author}
                </span>
              </p>
            </div>
          )}
        </div>

        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Error rendering article:", error);
    return notFound();
  }
}
