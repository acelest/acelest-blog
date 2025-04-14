import { getAllArticles, getArticlesByCategory } from "@/app/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import { CategoryImage } from "@/components/CategoryImage";
import NavBar from "@/components/NavBar";
import { generateMetadata as generateBaseMetadata } from "@/lib/metadata";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Générer les métadonnées dynamiquement pour chaque page de catégorie
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const { category } = params;

  // Récupérer le libellé de la catégorie avec une première lettre majuscule
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return generateBaseMetadata({
    title: `Articles sur ${categoryLabel}`,
    description: `Découvrez tous nos articles et tutoriels sur ${categoryLabel}`,
    keywords: [category, "articles", "blog", "tutoriels"],
    pathname: `/articles/${category}`,
    locale: "fr",
  });
}

// Générer les routes statiques pour toutes les catégories
export async function generateStaticParams() {
  const articles = await getAllArticles();

  // Extraire toutes les catégories uniques
  const categories = Array.from(
    new Set(
      articles
        .filter((article) => article.category)
        .map((article) => article.category!.toLowerCase())
    )
  );

  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  // Récupérer tous les articles de cette catégorie
  const { category } = params;
  const articles = await getArticlesByCategory(category);

  // Si aucun article n'est trouvé pour cette catégorie, renvoyer 404
  if (articles.length === 0) {
    notFound();
  }

  // Récupérer le libellé de la catégorie avec une première lettre majuscule
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  // Rechercher une icône correspondant à la catégorie (si elle existe)
  const categoryIcon = `/img/${category.toLowerCase()}.svg`;

  return (
    <main className="flex min-h-screen flex-col">
      <NavBar />

      {/* Espace entre navbar et contenu */}
      <div className="mt-20 md:mt-24"></div>

      <div className="container mx-auto px-4 py-12">
        {/* En-tête de la page avec image/icône de la catégorie si disponible */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <Link
              href="/articles"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary flex items-center gap-1 transition-colors w-fit"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Tous les articles</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CategoryImage
                  categoryName={categoryLabel}
                  categoryIcon={categoryIcon}
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                {categoryLabel}
              </h1>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Découvrez tous nos articles et tutoriels sur {categoryLabel}
          </p>
        </header>

        {/* Liste des articles */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={{
                ...article,
                coverImage: article.coverImage || "/img/og/default-cover.svg",
              }}
            />
          ))}
        </div>

        {/* Message si peu d'articles */}
        {articles.length <= 2 && (
          <div className="mt-12 p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Nous ajoutons régulièrement de nouveaux contenus. Revenez bientôt
              pour découvrir plus d&apos;articles sur {categoryLabel} !
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
