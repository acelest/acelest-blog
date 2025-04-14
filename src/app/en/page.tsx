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
  title: "Home",
  description:
    "Discover tutorials, tips and best practices about web development, React, Next.js and modern technologies.",
  keywords: [
    "web development",
    "react",
    "next.js",
    "javascript",
    "tutorials",
    "tech blog",
  ],
  pathname: "/",
  locale: "en",
});

export default async function EnglishHome() {
  // Display max 4 recent articles on the homepage
  const articlesData = await getRecentArticles(4);
  const recentArticles = articlesData.map((article) => ({
    ...article,
    coverImage: article.coverImage || "/img/og/default-cover.jpg",
  }));

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />

      {/* Hero Section */}
      <section className="w-full min-h-[60vh] mt-10 px-4 md:px-6 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 grid-background dark:opacity-30 opacity-25"></div>
        <LineShadowTextDemo />
      </section>

      {/* Overview Section with two columns (articles + tutorials) */}
      <BlogOverviewSection
        articles={recentArticles}
        tutorials={demoTutorials}
      />

      {/* Apple Cards Carousel for mini-tutorials */}
      <AppleCardsCarouselDemo />

      {/* YouTube Tutorials Section */}
      <VideoTutorialsSection tutorials={demoVideoTutorials} />

      {/* Social Media and Newsletter Section */}
      <SocialAndNewsletterSection />
    </main>
  );
}
