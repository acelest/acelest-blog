import NavBar from "@/components/NavBar";
import { LineShadowTextDemo } from "@/components/TextHero";

export default function EnglishHome() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <section className="w-full mt-32 px-4 md:px-6 flex flex-col items-center justify-center">
        <LineShadowTextDemo />
      </section>
    </main>
  );
}
