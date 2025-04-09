"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { LineShadowText } from "./magicui/line-shadow-text";
import { Button } from "./ui/button";

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
    <div className="flex flex-col items-center text-center gap-8 w-full max-w-5xl mx-auto">
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
        <Button asChild size="lg">
          <Link href={isEnglishPath ? "/en/articles" : "/articles"}>
            {isEnglishPath ? "Explore articles" : "Explorer les articles"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 14 0" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  );
}
