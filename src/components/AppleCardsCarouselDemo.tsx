"use client";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Mini-tutoriels développeur
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({
  content,
  imagePath,
}: {
  content: string;
  imagePath: string;
}) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        {content}
      </p>

      {/* Container avec ratio fixe pour maintenir la forme */}
      <div className="relative w-full max-w-3xl mx-auto my-8 aspect-[16/9] overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-700">
        <Image
          src={`/img/og/${imagePath}`}
          alt="Illustration du tutoriel"
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

const data = [
  {
    category: "React",
    title: "Maîtriser les Hooks React",
    src: "/img/og/react-hooks.png",
    imagePath: "react-hooks.png",
    content: (
      <DummyContent
        content="Les React Hooks permettent d'utiliser l'état et d'autres fonctionnalités React sans avoir à écrire de classe. Découvrez comment utiliser useState, useEffect, useContext, useRef et d'autres hooks pour rendre votre code plus lisible et plus facile à maintenir."
        imagePath="react-hooks.png"
      />
    ),
  },
  {
    category: "CSS",
    title: "Le guide complet de Flexbox",
    src: "/img/og/css.jpg",
    imagePath: "css-flexbox.png",
    content: (
      <DummyContent
        content="Flexbox est un modèle de disposition en CSS qui permet de concevoir des structures de page flexibles et efficaces. Apprenez à maîtriser les propriétés comme flex-direction, justify-content, align-items et bien d'autres pour créer des mises en page responsives."
        imagePath="css-flexbox.png"
      />
    ),
  },

  {
    category: "TypeScript",
    title: "Comprendre les génériques TypeScript",
    src: "/img/og/coder.jpg",
    imagePath: "typescript-generics.svg",
    content: (
      <DummyContent
        content="Les génériques sont l'un des concepts les plus puissants de TypeScript. Ils vous permettent de créer des composants réutilisables et type-safe qui peuvent fonctionner avec différents types. Apprenez à les utiliser efficacement dans vos projets."
        imagePath="typescript-generics.svg"
      />
    ),
  },
  {
    category: "Web",
    title: "Optimiser la performance web",
    src: "/img/og/web-performance.png",
    imagePath: "web-performance.svg",
    content: (
      <DummyContent
        content="La performance web est cruciale pour offrir une bonne expérience utilisateur. Découvrez les techniques pour optimiser le chargement des ressources, réduire la taille des bundles JS, implémenter la lazy-loading et améliorer les métriques Web Vitals."
        imagePath="web-performance.svg"
      />
    ),
  },
  {
    category: "Git",
    title: "Les commandes Git essentielles",
    src: "/img/og/dev.jpg",
    imagePath: "git-commands.svg",
    content: (
      <DummyContent
        content="Git est un outil indispensable pour tout développeur. Ce guide couvre les commandes essentielles pour la gestion de versions, le travail collaboratif, la résolution de conflits et les meilleures pratiques pour maintenir un historique de commit propre."
        imagePath="git-commands.svg"
      />
    ),
  },
];
