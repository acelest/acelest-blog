import { Metadata } from "next";

// URL du site pour les liens absolus
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://acelest-blog.vercel.app";

// Métadonnées par défaut réutilisables pour tout le site
const defaultMetadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

// Suffixe à ajouter à la fin des titres de pages
const titleSuffix = " | Acelest Blog";

// Type pour les options de métadonnées
type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  pathname?: string;
  locale?: "fr" | "en";
  type?: "website" | "article";
};

// Fonction pour générer les métadonnées selon la langue et le contenu
export function generateMetadata({
  title = "",
  description = "",
  keywords = [],
  image = "/img/default-og.png",
  pathname = "",
  locale = "fr",
  type = "website",
}: MetadataProps): Metadata {
  // Construction du titre avec le suffixe
  const fullTitle = title
    ? `${title}${titleSuffix}`
    : `Acelest Blog${
        locale === "fr"
          ? " | Développement web et technologies"
          : " | Web Development and Technologies"
      }`;

  // Description par défaut selon la langue
  const defaultDescription =
    locale === "fr"
      ? "Blog tech, astuces de développement web, React, Next.js et technologies modernes."
      : "Tech blog, web development tips, React, Next.js and modern technologies.";

  // Construction de l'URL absolue pour la page
  const url = `${siteUrl}${locale === "en" ? "/en" : ""}${pathname}`;

  // Construction de l'URL absolue pour l'image
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return {
    ...defaultMetadata,
    title: fullTitle,
    description: description || defaultDescription,
    keywords:
      keywords.length > 0
        ? keywords
        : ["développement web", "tech", "react", "next.js", "javascript"],
    authors: [{ name: "Acelest", url: "https://github.com/acelest" }],
    creator: "Acelest",
    publisher: "Acelest",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: {
        fr: locale === "fr" ? undefined : pathname.replace("/en", "") || "/",
        en: locale === "en" ? undefined : `/en${pathname}`,
      },
    },
    openGraph: {
      type,
      title: fullTitle,
      description: description || defaultDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      url,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      siteName: "Acelest Blog",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || defaultDescription,
      images: [imageUrl],
      creator: "@acelest",
    },
  };
}
