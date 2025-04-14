import { getAllArticles } from "@/app/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import NavBar from "@/components/NavBar";
import { generateMetadata as generateBaseMetadata } from "@/lib/metadata";
import { ArrowDown } from "lucide-react";
import { Metadata } from "next";

// Generate metadata for the articles page
export const metadata: Metadata = generateBaseMetadata({
  title: "Articles and tutorials",
  description:
    "Discover all our articles and tutorials about web development, technology and best practices.",
  keywords: ["articles", "blog", "tutorials", "web development", "tech"],
  pathname: "/en/articles",
  locale: "en",
});

export default async function ArticlesPage() {
  // Get all articles sorted by date (most recent first)
  const articles = await getAllArticles(
    [
      "slug",
      "title",
      "date",
      "excerpt",
      "coverImage",
      "category",
      "tags",
      "readingTime",
      "author",
    ],
    "en"
  );

  // Group articles by year for chronological display
  const articlesByYear: Record<string, typeof articles> = {};

  articles.forEach((article) => {
    const year = new Date(article.date).getFullYear().toString();
    if (!articlesByYear[year]) {
      articlesByYear[year] = [];
    }
    articlesByYear[year].push(article);
  });

  // Get years sorted from most recent to oldest
  const years = Object.keys(articlesByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <main className="flex min-h-screen flex-col">
      <NavBar />

      {/* Space between navbar and content */}
      <div className="mt-20 md:mt-24"></div>

      <div className="container mx-auto px-4 py-12">
        {/* Page header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Articles and tutorials
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover all our articles about web development, technology and best
            practices. {articles.length} articles available.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#latest-articles"
              className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <span className="text-sm mb-1">Latest articles</span>
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </a>
          </div>
        </header>

        {/* Articles by year */}
        <div id="latest-articles" className="space-y-24">
          {years.map((year) => (
            <section key={year} className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-4">
                {year}
                <span className="text-gray-500 dark:text-gray-400 text-lg ml-3">
                  ({articlesByYear[year].length} articles)
                </span>
              </h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articlesByYear[year].map((article) => (
                  <ArticleCard
                    key={article.slug}
                    article={{
                      ...article,
                      coverImage:
                        article.coverImage || "/img/og/default-cover.svg",
                    }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Message if no articles */}
        {articles.length === 0 && (
          <div className="mt-12 p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No articles available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
