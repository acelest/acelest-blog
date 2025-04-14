import { getRecentArticles } from "@/app/lib/articles";
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

export default async function Home() {
  // N'afficher que 4 articles récents maximum sur la page d'accueil
  const articlesData = await getRecentArticles(4);
  const recentArticles = articlesData.map((article) => ({
    ...article,
    coverImage: article.coverImage || "/img/og/default-cover.jpg",
  }));

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />

      {/* Section Hero - hauteur réduite de 80vh à 60vh */}
      <section className="w-full min-h-[60vh] mt-10 px-4 md:px-6 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 grid-background dark:opacity-30 opacity-25"></div>
        <LineShadowTextDemo />
      </section>

      {/* Section Overview en deux colonnes (articles + tutoriels) */}
      <BlogOverviewSection
        articles={recentArticles}
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
