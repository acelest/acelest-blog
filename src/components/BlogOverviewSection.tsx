"use client";

import { Article } from "@/app/lib/articles";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, Youtube } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import YouTubeEmbed, { getYouTubeVideoId } from "./YouTubeEmbed";
import { Button } from "./ui/button";

/**
 * Composant BlogOverviewSection
 *
 * Layout en deux colonnes côte à côte :
 * - Colonne de gauche : "Derniers posts"
 *    - Affiche une liste verticale compacte avec :
 *        - Date (petite taille, gris clair)
 *        - Titre de l'article en gras
 *        - Petite description en dessous
 *
 * - Colonne de droite : "Tutoriels"
 *    - Titre clair "Tutoriels"
 *    - Liste verticale de tutoriels
 *      Chaque item affiche :
 *        - Une miniature de la vidéo YouTube (taille max adaptée)
 *        - Le titre du tutoriel
 *        - Un chevron pour indiquer le lien
 *
 * Utilise `grid` avec Tailwind CSS pour faire le layout en deux colonnes bien espacées.
 * Design global sobre, responsive et minimaliste.
 */

interface Tutorial {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  youtubeUrl: string; // Ajout du lien YouTube
}

interface BlogOverviewSectionProps {
  articles: Article[];
  tutorials: Tutorial[];
  className?: string;
}

export default function BlogOverviewSection({
  articles,
  tutorials,
  className,
}: BlogOverviewSectionProps) {
  const pathname = usePathname();
  const isEnglishPath = pathname.startsWith("/en");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isEnglishPath ? "en-US" : "fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className={cn("py-16", className)}>
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Colonne gauche: Derniers articles */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-4">
              {isEnglishPath ? "Latest Posts" : "Derniers Posts"}
            </h2>

            <div className="space-y-8">
              {articles.map((article) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href={`${isEnglishPath ? "/en" : ""}/articles/post/${
                      article.slug
                    }`}
                    className="group block"
                  >
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(article.date)}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href={`${isEnglishPath ? "/en" : ""}/articles`}
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {isEnglishPath ? "View all posts" : "Voir tous les articles"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Colonne droite: Tutoriels */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-4">
              {isEnglishPath ? "Tutorials" : "Tutoriels"}
            </h2>

            <div className="space-y-2">
              {tutorials.map((tutorial, index) => {
                const videoId = getYouTubeVideoId(tutorial.youtubeUrl);
                return (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="mb-4"
                  >
                    <div className="group">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                        {tutorial.title}
                      </h3>
                      {videoId && (
                        <YouTubeEmbed
                          videoId={videoId}
                          title={tutorial.title}
                          className="w-full rounded-lg overflow-hidden"
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-4">
              <Button
                asChild
                className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <Link
                  href="https://www.youtube.com/@ACELESTDEV"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isEnglishPath
                    ? "Visit our YouTube Channel"
                    : "Visitez notre chaîne YouTube"}
                  <Youtube className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Données de démonstration pour les tutoriels (2 vidéos)
export const demoTutorials: Tutorial[] = [
  {
    id: "1",
    title: "Créer un blog avec Next.js et Tailwind CSS",
    slug: "creer-blog-nextjs-tailwind",
    thumbnail: "/img/og/web-dev-guide.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=s1MUcxO-x8Q",
  },
  {
    id: "2",
    title: "Maîtriser les hooks React pour les débutants",
    slug: "maitriser-hooks-react-debutants",
    thumbnail: "/img/og/web-dev-guide.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
  },
];
