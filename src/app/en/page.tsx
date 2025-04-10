import NavBar from "@/components/NavBar";
import { LineShadowTextDemo } from "@/components/TextHero";
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

export default function EnglishHome() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <section className="w-full min-h-[60vh] mt-10 px-4 md:px-6 flex flex-col items-center justify-center relative">
        <LineShadowTextDemo />
      </section>
    </main>
  );
}
