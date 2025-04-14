"use server";

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
  [key: string]: string | string[] | undefined; // Signature d'index avec des types spécifiques
};

const articlesDirectory = path.join(
  process.cwd(),
  "src/components/content/articles"
);

// Obtenir tous les slugs des articles
export async function getArticleSlugs(): Promise<string[]> {
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
export async function getArticleBySlug(
  slug: string,
  fields: string[] = []
): Promise<Article> {
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
export async function getAllArticles(
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
): Promise<Article[]> {
  const slugs = await getArticleSlugs();
  const articlesPromises = slugs.map((slug) => getArticleBySlug(slug, fields));
  const articles = await Promise.all(articlesPromises);
  // Trier par date, du plus récent au plus ancien
  return articles.sort((a, b) =>
    new Date(a.date) > new Date(b.date) ? -1 : 1
  );
}

// Récupérer les articles par catégorie
export async function getArticlesByCategory(
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
): Promise<Article[]> {
  const articles = await getAllArticles(fields);
  return articles.filter(
    (article) => article.category?.toLowerCase() === category.toLowerCase()
  );
}

// Récupérer les articles populaires (à adapter selon votre logique de popularité)
export async function getFeaturedArticles(
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
): Promise<Article[]> {
  // Ici, on prend simplement les articles les plus récents comme "populaires"
  // Dans un cas réel, on pourrait avoir une logique basée sur des vues, des likes, etc.
  const articles = await getAllArticles(fields);
  return articles.slice(0, limit);
}

// Récupérer les articles les plus récents
export async function getRecentArticles(
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
): Promise<Article[]> {
  const articles = await getAllArticles(fields);
  return articles.slice(0, limit);
}

// Vérifier si un slug représente une catégorie ou un article
export async function isCategory(slug: string): Promise<boolean> {
  // Vérifier si le fichier MD existe pour ce slug
  const articlePath = path.join(articlesDirectory, `${slug}.md`);
  const articleExists = fs.existsSync(articlePath);

  if (articleExists) {
    return false; // C'est un article, pas une catégorie
  }

  // Vérifier si des articles sont associés à cette catégorie
  const articles = await getAllArticles(["category"]);
  return articles.some(
    (article) => article.category?.toLowerCase() === slug.toLowerCase()
  );
}

// Obtenir toutes les catégories uniques
export async function getAllCategories(): Promise<string[]> {
  const articles = await getAllArticles(["category"]);

  // Extraire toutes les catégories uniques
  return Array.from(
    new Set(
      articles
        .filter((article) => article.category)
        .map((article) => article.category!.toLowerCase())
    )
  );
}
