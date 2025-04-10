"use client";

import { Article } from "@/app/lib/articles";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Composant BlogOverviewSection
 *
 * Layout en deux colonnes côte à côte :
 * - Colonne de gauche : "Derniers posts"
 *    - Affiche une liste verticale compacte avec :
 *        - Date (petite taille, gris clair)
 *        - Titre de l'article en gras
 *        - Petite description en dessous
 *    - Style inspiré de shadcn/ui : sobre, élégant, espacé juste comme il faut
 *
 * - Colonne de droite : "Tutoriels"
 *    - Titre clair "Tutoriels"
 *    - Liste verticale de tutoriels (avec →)
 *    - Chaque item est cliquable
 *    - Texte lisible, hiérarchisé, espacé
 *
 * Utilise `grid` avec Tailwind CSS pour faire le layout en deux colonnes bien espacées.
 * Design global sombre, responsive, et minimaliste.
 */

interface Tutorial {
  id: string;
  title: string;
  slug: string;
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
    <section className={cn("py-16 bg-gray-50 dark:bg-gray-900/30", className)}>
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
                    href={`${isEnglishPath ? "/en" : ""}/articles/${
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
              {tutorials.map((tutorial, index) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={`${isEnglishPath ? "/en" : ""}/tutorials/${
                      tutorial.slug
                    }`}
                    className="group flex items-center justify-between py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                      {tutorial.title}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href={`${isEnglishPath ? "/en" : ""}/tutorials`}
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {isEnglishPath
                  ? "Browse all tutorials"
                  : "Parcourir tous les tutoriels"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Données de démonstration pour les tutoriels
export const demoTutorials: Tutorial[] = [
  {
    id: "1",
    title: "Créer un blog avec Next.js et Tailwind CSS",
    slug: "creer-blog-nextjs-tailwind",
  },
  {
    id: "2",
    title: "Maîtriser les hooks React pour les débutants",
    slug: "maitriser-hooks-react-debutants",
  },
  {
    id: "3",
    title: "Animations fluides avec Framer Motion",
    slug: "animations-fluides-framer-motion",
  },
  {
    id: "4",
    title: "Créer une API REST avec Node.js",
    slug: "creer-api-rest-nodejs",
  },
  {
    id: "5",
    title: "Authentification moderne avec NextAuth.js",
    slug: "authentification-moderne-nextauth",
  },
];
