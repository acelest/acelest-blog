import { getAllArticles, getArticlesByCategory } from "@/app/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import { CategoryImage } from "@/components/CategoryImage";
import NavBar from "@/components/NavBar";
import { generateMetadata as generateBaseMetadata } from "@/lib/metadata";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate metadata dynamically for each category page (English version)
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const { category } = params;

  // Get the category label with first letter uppercase
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return generateBaseMetadata({
    title: `${categoryLabel} Articles`,
    description: `Discover all our articles and tutorials about ${categoryLabel}`,
    keywords: [category, "articles", "blog", "tutorials"],
    pathname: `/en/articles/${category}`,
    locale: "en",
  });
}

// Generate static routes for all categories
export async function generateStaticParams() {
  const articles = await getAllArticles();

  // Extract all unique categories
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
  // Get all articles for this category
  const { category } = params;
  const articles = await getArticlesByCategory(category);

  // If no articles are found for this category, return 404
  if (articles.length === 0) {
    notFound();
  }

  // Get the category label with first letter uppercase
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  // Look for an icon corresponding to the category (if it exists)
  const categoryIcon = `/img/${category.toLowerCase()}.svg`;

  return (
    <main className="flex min-h-screen flex-col">
      <NavBar />

      {/* Space between navbar and content */}
      <div className="mt-20 md:mt-24"></div>

      <div className="container mx-auto px-4 py-12">
        {/* Page header with category icon if available */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <Link
              href="/en/articles"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary flex items-center gap-1 transition-colors w-fit"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>All articles</span>
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
            Discover all our articles and tutorials about {categoryLabel}
          </p>
        </header>

        {/* List of articles */}
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

        {/* Message if few articles */}
        {articles.length <= 2 && (
          <div className="mt-12 p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              We regularly add new content. Check back soon for more articles
              about {categoryLabel}!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
