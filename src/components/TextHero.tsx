"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedGradientText } from "./magicui/animated-gradient-text";
import { LineShadowText } from "./magicui/line-shadow-text";

export function LineShadowTextDemo() {
  const { resolvedTheme } = useTheme();
  const shadowColor = resolvedTheme === "dark" ? "white" : "black";
  const pathname = usePathname();
  const isEnglishPath = pathname.startsWith("/en");

  // Animation du sous-titre
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // État pour l'effet typewriter
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Liste des mots à afficher selon la langue
  const words = useMemo(
    () =>
      isEnglishPath
        ? [
            "React.js",
            "Next.js",
            "TypeScript",
            "Web Development",
            "UI/UX",
            "Tailwind CSS",
          ]
        : [
            "React.js",
            "Next.js",
            "TypeScript",
            "Développement Web",
            "UI/UX",
            "Tailwind CSS",
          ],
    [isEnglishPath]
  );

  const currentWordIndex = loopNum % words.length;

  // Référence pour vérifier si le composant est monté
  const isMounted = useRef(true);

  useEffect(() => {
    // Nettoyage
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    // Délai court pour l'animation de fade-in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Effet pour l'animation de la machine à écrire
  useEffect(() => {
    if (!mounted) return;

    const handleTyping = () => {
      if (!isMounted.current) return;

      const fullWord = words[currentWordIndex];
      const shouldDelete = isDeleting && typedText.length === 0;
      const shouldType = !isDeleting && typedText.length === fullWord.length;

      if (shouldDelete) {
        setIsDeleting(false);
        setLoopNum((loopNum) => loopNum + 1);
        setTypingSpeed(150);
        return;
      }

      if (shouldType) {
        setIsDeleting(true);
        setTypingSpeed(80);
        return;
      }

      const delta = isDeleting ? 80 : 150;

      if (isDeleting) {
        setTypedText(typedText.substring(0, typedText.length - 1));
      } else {
        setTypedText(fullWord.substring(0, typedText.length + 1));
      }

      setTypingSpeed(delta);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [
    typedText,
    isDeleting,
    loopNum,
    currentWordIndex,
    mounted,
    words,
    typingSpeed,
  ]);

  // Si le theme n'est pas encore résolu, on ne rend rien pour éviter un flash
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center text-center gap-6 w-full max-w-5xl mx-auto -mt-40">
      <h1 className="text-balance text-5xl font-bold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
        {isEnglishPath ? "Acelest " : "ACELEST "}{" "}
        <LineShadowText className="italic" shadowColor={shadowColor}>
          Blog
        </LineShadowText>
      </h1>

      <div
        className={`text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 ease-in-out h-8 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="inline">
          {isEnglishPath ? "Writing about " : "J'écris sur "}
        </p>
        <span className="text-primary font-medium inline-block min-w-20 text-left">
          {typedText}
          <span className="animate-blink">|.._</span>
        </span>
      </div>

      <div
        className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Link
          href={isEnglishPath ? "/en/articles" : "/articles"}
          className="mt-4 group relative flex items-center justify-center rounded-full px-6 py-2.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]"
        >
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#7fb59d]/60 via-[#a3b3b9]/60 to-[#7fb59d]/60 bg-[length:300%_100%] p-[1px]"
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          ✨ <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText
            className="text-base font-medium"
            colorFrom="#7fb59d"
            colorTo="#a3b3b9"
          >
            {isEnglishPath ? "Explore articles" : "Explorer les articles"}
          </AnimatedGradientText>
          <ChevronRight
            className="ml-1 size-4 stroke-neutral-500 transition-transform
       duration-300 ease-in-out group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
