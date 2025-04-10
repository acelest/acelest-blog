"use client";

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { usePathname } from "next/navigation";
import { Article } from "./ArticleCard";

/**
 * Composant FeaturedPostsCarousel
 *
 * Utilise le composant Apple Cards Carousel de Aceternity UI
 *
 * Chaque carte contient :
 * - une image
 * - un titre
 * - un texte (mini tutoriel statique)
 *
 * Affiche cette section sous le titre "À la une".
 */

interface FeaturedPostsCarouselProps {
  articles: Article[];
  className?: string;
}

export default function FeaturedPostsCarousel({
  articles,
  className,
}: FeaturedPostsCarouselProps) {
  const pathname = usePathname();
  const isEnglishPath = pathname.startsWith("/en");

  // Transformer les articles en format de carte pour le carousel
  const carouselCards = articles.map((article) => ({
    src: article.coverImage,
    title: article.title,
    category: article.category || (isEnglishPath ? "Featured" : "À la une"),
    content: (
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>
            {new Date(article.date).toLocaleDateString(
              isEnglishPath ? "en-US" : "fr-FR"
            )}
          </span>
          <span className="mx-2">•</span>
          <span>{article.readingTime}</span>
        </div>
        <a
          href={`${isEnglishPath ? "/en" : ""}/articles/${article.slug}`}
          className="mt-6 inline-flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          {isEnglishPath ? "Read article" : "Lire l'article"}
        </a>
      </div>
    ),
  }));

  return (
    <section className={`py-16 ${className}`}>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {isEnglishPath ? "Featured Posts" : "Articles à la une"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            {isEnglishPath
              ? "Discover our most popular and valuable content selected just for you."
              : "Découvrez notre contenu le plus populaire et précieux sélectionné spécialement pour vous."}
          </p>
        </div>

        {/* Carousel de cartes style Apple */}
        <Carousel
          items={carouselCards.map((card, index) => (
            <Card key={index} card={card} index={index} layout={true} />
          ))}
          initialScroll={0}
        />
      </div>
    </section>
  );
}

// Données d'exemple pour le carousel
export const demoFeaturedArticles: Article[] = [
  {
    title: "Comment construire une API REST avec Node.js et Express",
    slug: "construire-api-rest-nodejs-express",
    excerpt:
      "Un guide complet pour créer une API RESTful robuste avec Node.js et Express.js. Découvrez comment structurer votre projet, gérer les routes et connecter une base de données MongoDB.",
    coverImage: "/img/og/nodejs-api.jpg",
    date: "2023-09-15",
    readingTime: "12 min",
    category: "Backend",
    tags: ["Node.js", "Express", "API", "REST", "MongoDB"],
  },
  {
    title: "React 18 : Les nouvelles fonctionnalités à connaître",
    slug: "react-18-nouvelles-fonctionnalites",
    excerpt:
      "Découvrez les fonctionnalités révolutionnaires de React 18, y compris le nouveau concurrent renderer, automatic batching et les transitions. Guide complet pour mettre à niveau vos applications.",
    coverImage: "/img/og/react-18.jpg",
    date: "2023-10-07",
    readingTime: "8 min",
    category: "React",
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    title: "Le guide ultime des animations CSS modernes",
    slug: "guide-animations-css-modernes",
    excerpt:
      "Maîtrisez l'art des animations CSS modernes. De la théorie de l'animation aux techniques avancées comme les transitions 3D, ce guide couvre tout ce dont vous avez besoin pour créer des expériences web captivantes.",
    coverImage: "/img/og/css-animations.jpg",
    date: "2023-08-21",
    readingTime: "15 min",
    category: "CSS",
    tags: ["CSS", "Animation", "Frontend", "Design"],
  },
  {
    title: "Comprendre le State Management avec Redux Toolkit",
    slug: "comprendre-state-management-redux-toolkit",
    excerpt:
      "Simplifiez la gestion d'état dans vos applications React avec Redux Toolkit. Ce guide pas à pas vous montre comment configurer un store, créer des slices et utiliser les hooks Redux de manière efficace.",
    coverImage: "/img/og/redux-toolkit.jpg",
    date: "2023-11-02",
    readingTime: "10 min",
    category: "React",
    tags: ["Redux", "React", "State Management"],
  },
  {
    title: "TypeScript avancé pour les développeurs React",
    slug: "typescript-avance-developpeurs-react",
    excerpt:
      "Exploitez toute la puissance de TypeScript dans vos projets React. De l'inférence de types aux génériques avancés, apprenez comment écrire du code React plus sûr et plus maintenable.",
    coverImage: "/img/og/typescript-react.jpg",
    date: "2023-09-30",
    readingTime: "14 min",
    category: "TypeScript",
    tags: ["TypeScript", "React", "Frontend"],
  },
];
