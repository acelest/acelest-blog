import fs from "fs";
import matter from "gray-matter";
import path from "path";

// Définition d'un type pour les articles
export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: string;
  tags?: string[];
  coverImage?: string;
  category?: string;
  author?: string;
  [key: string]: string | string[] | undefined; // Ajout d'une signature d'index pour permettre l'accès dynamique
};

const articlesDirectory = path.join(
  process.cwd(),
  "src/components/content/articles"
);

// Obtenir tous les slugs des articles
export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// Estimation du temps de lecture
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

// Récupérer un article par son slug
export function getArticleBySlug(slug: string, fields: string[] = []): Article {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(articlesDirectory, `${realSlug}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Utiliser le temps de lecture indiqué dans le frontmatter ou le calculer
  const readingTime = data.readingTime || calculateReadingTime(content);

  // Construire l'article
  const article: Partial<Article> = {};

  // Remplir les champs demandés
  fields.forEach((field) => {
    if (field === "slug") {
      article[field] = realSlug;
    }
    if (field === "content") {
      article[field] = content;
    }
    if (field === "readingTime") {
      article[field] = readingTime;
    }
    if (field === "excerpt" && !data[field]) {
      // Générer un extrait à partir du contenu si non spécifié
      article[field] = content.slice(0, 150).trim() + "...";
    }

    if (field in data) {
      article[field] = data[field];
    }
  });

  return article as Article;
}

// Récupérer tous les articles
export function getAllArticles(
  fields: string[] = [
    "slug",
    "title",
    "date",
    "excerpt",
    "coverImage",
    "category",
    "tags",
    "readingTime",
    "author",
  ]
): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug, fields))
    // Trier par date, du plus récent au plus ancien
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return articles;
}

// Récupérer les articles par catégorie
export function getArticlesByCategory(
  category: string,
  fields: string[] = [
    "slug",
    "title",
    "date",
    "excerpt",
    "coverImage",
    "category",
    "tags",
    "readingTime",
  ]
): Article[] {
  const articles = getAllArticles(fields);
  return articles.filter(
    (article) => article.category?.toLowerCase() === category.toLowerCase()
  );
}

// Récupérer les articles populaires (à adapter selon votre logique de popularité)
export function getFeaturedArticles(
  limit: number = 5,
  fields: string[] = [
    "slug",
    "title",
    "date",
    "excerpt",
    "coverImage",
    "category",
    "tags",
    "readingTime",
  ]
): Article[] {
  // Ici, on prend simplement les articles les plus récents comme "populaires"
  // Dans un cas réel, on pourrait avoir une logique basée sur des vues, des likes, etc.
  return getAllArticles(fields).slice(0, limit);
}

// Récupérer les articles les plus récents
export function getRecentArticles(
  limit: number = 3,
  fields: string[] = [
    "slug",
    "title",
    "date",
    "excerpt",
    "coverImage",
    "category",
    "tags",
    "readingTime",
  ]
): Article[] {
  return getAllArticles(fields).slice(0, limit);
}
