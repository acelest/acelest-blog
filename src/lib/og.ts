import { siteUrl } from "./metadata";

// Fonction pour construire l'URL de l'image OG pour un article
export function getArticleOgImage(params: {
  title: string;
  category?: string;
  author?: string;
  locale?: string;
  slug: string;
}) {
  // Vous pourriez utiliser une API d'image comme Vercel OG, Cloudinary ou une solution personnalisée
  // Pour l'instant nous renvoyons une URL statique, mais cela pourrait être dynamique

  // Pour une solution future avec une API d'images OG
  // return `${siteUrl}/api/og?title=${encodeURIComponent(params.title)}&category=${params.category ? encodeURIComponent(params.category) : ""}&author=${params.author ? encodeURIComponent(params.author) : "Acelest"}&locale=${params.locale || "fr"}`;

  // Pour l'instant, retournons simplement l'image par défaut ou une image par catégorie si elle existe
  if (params.category) {
    // On pourrait avoir des images par catégorie
    return `/img/og/${params.category.toLowerCase().replace(/\s+/g, "-")}.png`;
  }

  return `/img/og/default-article.png`;
}

// Fonction pour obtenir les données de l'article à partir du contenu markdown
export async function getArticleMetadata(slug: string, locale = "fr") {
  // Cette fonction serait adaptée à votre système de gestion de contenu
  // Pour le moment, nous simulons des données

  // Dans un système réel, vous chargeriez les données de l'article depuis votre CMS, fichiers markdown, etc.
  // Exemple : const article = await fetchArticleFromCMS(slug, locale);

  // Simulation de données pour la démonstration
  // Dans une implémentation réelle, ces données viendraient de votre système de contenu
  const demoArticles: Record<string, any> = {
    "c-est-quoi-react": {
      title: locale === "fr" ? "C'est quoi React ?" : "What is React?",
      description:
        locale === "fr"
          ? "Une introduction à React.js, la bibliothèque JavaScript populaire pour créer des interfaces utilisateur interactives."
          : "An introduction to React.js, the popular JavaScript library for building interactive user interfaces.",
      category: "React",
      author: "Acelest",
      image: "/img/og/react.png",
      keywords: ["React", "JavaScript", "Frontend", "UI"],
      date: "2023-05-15",
    },
    "createreact-app": {
      title:
        locale === "fr"
          ? "Comment démarrer avec Create React App"
          : "How to get started with Create React App",
      description:
        locale === "fr"
          ? "Guide pas à pas pour créer votre première application React avec Create React App."
          : "Step-by-step guide to create your first React application with Create React App.",
      category: "React",
      author: "Acelest",
      image: "/img/og/react.png",
      keywords: ["React", "Create React App", "JavaScript", "Tutorial"],
      date: "2023-06-10",
    },
  };

  // Récupérer les données de l'article
  const article = demoArticles[slug];

  if (!article) {
    throw new Error(`Article with slug "${slug}" not found`);
  }

  return {
    ...article,
    slug,
    locale,
    url: `${siteUrl}${locale === "en" ? "/en" : ""}/articles/${slug}`,
  };
}
