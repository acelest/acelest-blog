import NavBar from "@/components/NavBar";
import { LineShadowTextDemo } from "@/components/TextHero";
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
  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <section className="w-full min-h-[80vh] mt-10 px-4 md:px-6 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 grid-background dark:opacity-25 opacity-20"></div>
        <LineShadowTextDemo />
      </section>
    </main>
  );
}
