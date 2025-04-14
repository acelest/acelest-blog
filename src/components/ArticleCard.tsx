"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Composant ArticleCard qui affiche un aperçu d'article de blog
 *
 * Chaque article contient :
 * - une image d'illustration (uploadée par moi)
 * - un titre
 * - une description
 * - une date
 *
 * Ce composant est responsive, et a un effet hover sympa (zoom léger sur l'image).
 */

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readingTime: string;
  tags?: string[];
  category?: string;
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({
  article,
  featured = false,
}: ArticleCardProps) {
  const pathname = usePathname();
  const isEnglishPath = pathname.startsWith("/en");

  // Formater la date selon la langue
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isEnglishPath ? "en-US" : "fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200",
        featured ? "md:flex-row md:h-[320px]" : "h-full"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-gray-200 dark:bg-gray-800",
          featured ? "md:h-auto md:w-1/2 h-56 w-full" : "h-48 w-full"
        )}
      >
        {article.coverImage ? (
          <div className="w-full h-full overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              width={featured ? 600 : 400}
              height={featured ? 400 : 240}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-400"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-primary/80 text-white rounded-md shadow-sm"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 2 && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-800/80 text-white rounded-md shadow-sm">
                +{article.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {article.category && (
          <div className="absolute bottom-4 right-4">
            <span className="px-3 py-1.5 text-xs font-medium bg-black/70 text-white rounded-full shadow-sm backdrop-blur-sm">
              {article.category}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span>•</span>
            <span>{article.readingTime}</span>
          </div>

          <Link
            href={`${isEnglishPath ? "/en" : ""}/articles/post/${article.slug}`}
            className="group-hover:opacity-100 block"
          >
            <h3 className="text-xl font-semibold leading-tight text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3">
              {article.excerpt}
            </p>
          </Link>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Link
            href={`${isEnglishPath ? "/en" : ""}/articles/post/${article.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {isEnglishPath ? "Read more" : "Lire la suite"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
