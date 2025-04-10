import NavBar from "@/components/NavBar";
import { LineShadowTextDemo } from "@/components/TextHero";

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
