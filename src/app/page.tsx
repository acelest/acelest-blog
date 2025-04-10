import { getFeaturedArticles, getRecentArticles } from "@/app/lib/articles";
import { AppleCardsCarouselDemo } from "@/components/AppleCardsCarouselDemo";
import BlogOverviewSection, {
  demoTutorials,
} from "@/components/BlogOverviewSection";
import NavBar from "@/components/NavBar";
import SocialAndNewsletterSection from "@/components/SocialAndNewsletterSection";
import { LineShadowTextDemo } from "@/components/TextHero";
import VideoTutorialsSection, {
  demoVideoTutorials,
} from "@/components/VideoTutorialsSection";
import { generateMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Accueil",
  description:
    "Découvrez des tutoriels, astuces et meilleures pratiques sur le développement web, React, Next.js et les technologies modernes.",
  keywords: [
    "développement web",
    "react",
    "next.js",
    "javascript",
    "tutoriels",
    "blog tech",
  ],
  pathname: "/",
  locale: "fr",
});

export default function Home() {
  // Récupération des articles à partir de notre collection d'articles markdown
  const featuredArticles = getFeaturedArticles(2).map((article) => ({
    ...article,
    coverImage: article.coverImage || "/img/og/default-cover.jpg",
  }));

  const recentArticles = getRecentArticles(2).map((article) => ({
    ...article,
    coverImage: article.coverImage || "/img/og/default-cover.jpg",
  }));

  // Articles supplémentaires pour la section BlogOverviewSection
  const blogOverviewArticles = getRecentArticles(5);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />

      {/* Section Hero */}
      <section className="w-full min-h-[80vh] mt-10 px-4 md:px-6 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 grid-background dark:opacity-25 opacity-20"></div>
        <LineShadowTextDemo />
      </section>

      {/* Section Overview en deux colonnes (articles + tutoriels) */}
      <BlogOverviewSection
        articles={blogOverviewArticles}
        tutorials={demoTutorials}
      />

      {/* Section Apple Cards Carousel pour les mini-tutoriels */}
      <AppleCardsCarouselDemo />

      {/* Section Tutoriels avec vidéos YouTube */}
      <VideoTutorialsSection tutorials={demoVideoTutorials} />

      {/* Section réseaux sociaux et newsletter */}
      <SocialAndNewsletterSection />
    </main>
  );
}
