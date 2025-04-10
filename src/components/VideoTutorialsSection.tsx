"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * Composant VideoTutorialsSection qui affiche une liste de tutoriels sous forme de vidéos YouTube
 *
 * Pour chaque tutoriel :
 * - un titre
 * - un lien vers une vidéo YouTube
 * - une miniature intégrée (iframe responsive)
 *
 * La section est stylée en grille responsive 2 ou 3 colonnes selon la taille.
 */

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
}

interface VideoTutorialsSectionProps {
  tutorials: VideoTutorial[];
  className?: string;
}

export default function VideoTutorialsSection({
  tutorials,
  className,
}: VideoTutorialsSectionProps) {
  const pathname = usePathname();
  const isEnglishPath = pathname.startsWith("/en");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Extraire toutes les catégories uniques des tutoriels
  const categories = [
    "all",
    ...Array.from(new Set(tutorials.map((tutorial) => tutorial.category))),
  ];

  // Filtrer les tutoriels par catégorie active
  const filteredTutorials =
    activeCategory === "all"
      ? tutorials
      : tutorials.filter((tutorial) => tutorial.category === activeCategory);

  return (
    <section className={cn("py-12", className)}>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {isEnglishPath ? "Video Tutorials" : "Tutoriels Vidéo"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            {isEnglishPath
              ? "Learn step-by-step with our video tutorials about web development and programming."
              : "Apprenez étape par étape avec nos tutoriels vidéo sur le développement web et la programmation."}
          </p>
        </div>

        {/* Filtres de catégories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === category
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {category === "all" ? (isEnglishPath ? "All" : "Tous") : category}
            </button>
          ))}
        </div>

        {/* Grille de tutoriels vidéo */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative pt-[56.25%] w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${tutorial.youtubeId}`}
                  title={tutorial.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-3">
                  {tutorial.category}
                </span>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {tutorial.description}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${tutorial.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  {isEnglishPath ? "Watch on YouTube" : "Regarder sur YouTube"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">
              {isEnglishPath
                ? "No tutorials found for this category."
                : "Aucun tutoriel trouvé pour cette catégorie."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Exemple de données pour les tutoriels (à remplacer par les vraies données)
export const demoVideoTutorials: VideoTutorial[] = [
  {
    id: "1",
    title: "Créer une application React avec Next.js",
    description:
      "Apprenez à configurer une application React moderne avec Next.js, le framework React qui simplifie le routage et le rendu côté serveur.",
    youtubeId: "wm5gMKuwSYk", // Exemple d'ID YouTube
    category: "React",
  },
  {
    id: "2",
    title: "Apprendre Tailwind CSS en 20 minutes",
    description:
      "Un guide rapide pour maîtriser les bases de Tailwind CSS et créer des interfaces responsive sans écrire de CSS personnalisé.",
    youtubeId: "hdGsFpZ0J2E", // Exemple d'ID YouTube
    category: "CSS",
  },
  {
    id: "3",
    title: "Les bases de TypeScript pour les développeurs JavaScript",
    description:
      "Découvrez comment ajouter du typage statique à votre code JavaScript avec TypeScript pour construire des applications plus robustes.",
    youtubeId: "BCg4U1FzODs", // Exemple d'ID YouTube
    category: "TypeScript",
  },
  {
    id: "4",
    title: "Créer des animations fluides avec Framer Motion",
    description:
      "Tutoriel pour ajouter facilement des animations professionnelles à votre site web React avec la bibliothèque Framer Motion.",
    youtubeId: "2V1WK-3HQNk", // Exemple d'ID YouTube
    category: "Animation",
  },
  {
    id: "5",
    title: "Gestion d'état avancée avec Redux Toolkit",
    description:
      "Guide pas à pas pour implémenter Redux Toolkit et simplifier la gestion d'état dans vos applications React complexes.",
    youtubeId: "5yEG6GhoJBs", // Exemple d'ID YouTube
    category: "React",
  },
  {
    id: "6",
    title: "Créer une API REST avec Node.js et Express",
    description:
      "Comment construire une API REST performante avec Node.js et Express pour servir vos applications front-end.",
    youtubeId: "l8WPWK9mS5M", // Exemple d'ID YouTube
    category: "Backend",
  },
];
