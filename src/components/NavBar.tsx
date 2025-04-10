"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageFlag from "./LanguageFlag";

// Définition du type pour une catégorie
type Category = {
  id: string;
  icon: string;
  label: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  color: string;
};

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Menu mobile
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Dropdown catégories (desktop & mobile)
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Correction d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effet de scroll sur la NavBar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer les menus en cas de clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Détermination de la langue via l'URL
  const isEnglishPath = pathname.startsWith("/en");

  // Tableau des catégories (à personnaliser)
  const categories: Category[] = [
    {
      id: "nextjs",
      icon: "/next.svg",
      label: { en: "Next.js", fr: "Next.js" },
      description: {
        en: "Learn Next.js and build modern web apps.",
        fr: "Apprenez Next.js pour créer des applications web modernes.",
      },
      color: "text-black dark:text-white",
    },
    {
      id: "linux",
      icon: "/linux.svg",
      label: { en: "Linux", fr: "Linux" },
      description: {
        en: "Master Linux and its distributions.",
        fr: "Maîtrisez Linux et ses distributions.",
      },
      color: "text-orange-500",
    },
    {
      id: "javascript",
      icon: "/file.svg",
      label: { en: "JavaScript", fr: "JavaScript" },
      description: {
        en: "Discover JavaScript tips and tutorials.",
        fr: "Découvrez des astuces et tutoriels JavaScript.",
      },
      color: "text-yellow-500",
    },
    {
      id: "windows",
      icon: "/window.svg",
      label: { en: "Windows", fr: "Windows" },
      description: {
        en: "Learn Windows development tips.",
        fr: "Apprenez les astuces de développement sur Windows.",
      },
      color: "text-blue-500",
    },
    {
      id: "django",
      icon: "/django.svg",
      label: { en: "Django", fr: "Django" },
      description: {
        en: "Build powerful web apps with Django.",
        fr: "Créez des applications web puissantes avec Django.",
      },
      color: "text-green-600",
    },
    {
      id: "vscode",
      icon: "/vscode.svg",
      label: { en: "VS Code", fr: "VS Code" },
      description: {
        en: "Boost your workflow with VS Code tips.",
        fr: "Optimisez votre productivité avec VS Code.",
      },
      color: "text-blue-400",
    },
    {
      id: "ui-design",
      icon: "/file.svg",
      label: { en: "UI Design", fr: "Design UI" },
      description: {
        en: "Learn UI design best practices.",
        fr: "Découvrez les meilleures pratiques en design UI.",
      },
      color: "text-purple-500",
    },
  ];

  // Liens de navigation
  const navLinks = [
    {
      en: { href: "/en", label: "Home" },
      fr: { href: "/", label: "Accueil" },
    },
    {
      en: { href: "/en/articles", label: "Articles" },
      fr: { href: "/articles", label: "Articles" },
    },
    {
      en: { href: "#", label: "Categories", isDropdown: true },
      fr: { href: "#", label: "Catégories", isDropdown: true },
    },
  ];

  // Fonction de changement de langue
  const switchLanguage = (toLang: "en" | "fr") => {
    if (toLang === "en") {
      const englishPath = pathname === "/" ? "/en" : `/en${pathname}`;
      router.push(englishPath);
    } else {
      const frenchPath = pathname.replace("/en", "");
      router.push(frenchPath || "/");
    }
    setIsLangOpen(false);
  };

  // Fermeture du menu mobile et du dropdown catégories lors d'un clic
  const handleLinkClick = () => {
    setIsOpen(false);
    setIsCategoryOpen(false);
  };

  // Navigation vers une catégorie
  const handleCategoryClick = (id: string) => {
    const basePath = isEnglishPath ? "/en/articles/" : "/articles/";
    router.push(`${basePath}${id}`);
    setIsCategoryOpen(false);
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={isEnglishPath ? "/en" : "/"}
            className="flex items-center gap-2"
          >
            <Image
              src="/vercel.svg"
              alt="Logo"
              width={32}
              height={32}
              className="dark:invert"
            />
            <span className="font-bold text-lg hidden sm:inline-block">
              Acelest Blog
            </span>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => {
              const currentLink = isEnglishPath ? link.en : link.fr;
              if (currentLink.isDropdown) {
                return (
                  <div key={index} className="relative" ref={categoryRef}>
                    <button
                      className={cn(
                        "font-medium text-sm transition-colors hover:text-primary flex items-center gap-2",
                        isCategoryOpen
                          ? "text-primary"
                          : "text-gray-600 dark:text-gray-300"
                      )}
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      onMouseEnter={() => setIsCategoryOpen(true)}
                    >
                      {currentLink.label}
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
                        className={cn(
                          "transition-transform",
                          isCategoryOpen ? "rotate-180" : ""
                        )}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {isCategoryOpen && (
                      <div className="absolute top-full z-20 mt-2 w-[500px] rounded-md border bg-white p-4 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Colonne de gauche : 4 premières catégories */}
                          <div className="space-y-4">
                            {categories.slice(0, 4).map((cat) => (
                              <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.id)}
                                className="flex items-start gap-3 rounded-md p-2 text-left hover:bg-gray-50 dark:hover:bg-zinc-800"
                              >
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-transparent">
                                  <Image
                                    src={cat.icon}
                                    alt={
                                      isEnglishPath
                                        ? cat.label.en
                                        : cat.label.fr
                                    }
                                    width={24}
                                    height={24}
                                    className={`h-6 w-6 ${cat.color}`}
                                  />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    {isEnglishPath
                                      ? cat.label.en
                                      : cat.label.fr}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {isEnglishPath
                                      ? cat.description.en
                                      : cat.description.fr}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Colonne de droite : catégories restantes */}
                          <div className="space-y-4">
                            {categories.slice(4).map((cat) => (
                              <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.id)}
                                className="flex items-start gap-3 rounded-md p-2 text-left hover:bg-gray-50 dark:hover:bg-zinc-800"
                              >
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-transparent">
                                  <Image
                                    src={cat.icon}
                                    alt={
                                      isEnglishPath
                                        ? cat.label.en
                                        : cat.label.fr
                                    }
                                    width={24}
                                    height={24}
                                    className={`h-6 w-6 ${cat.color}`}
                                  />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    {isEnglishPath
                                      ? cat.label.en
                                      : cat.label.fr}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {isEnglishPath
                                      ? cat.description.en
                                      : cat.description.fr}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={index}
                  href={currentLink.href}
                  className={cn(
                    "font-medium text-sm transition-colors hover:text-primary",
                    pathname === currentLink.href ||
                      (currentLink.href === "/" && pathname === "") ||
                      (currentLink.href === "/en" && pathname === "/en")
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-300"
                  )}
                >
                  {currentLink.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions (Langue & Thème) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative" ref={langRef}>
              <button
                className="flex items-center gap-2 px-3 py-1 border rounded-md"
                onClick={() => setIsLangOpen(!isLangOpen)}
                onMouseEnter={() => setIsLangOpen(true)}
              >
                <LanguageFlag language={isEnglishPath ? "en" : "fr"} />
                <span>{isEnglishPath ? "EN" : "FR"}</span>
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
                  className={cn(
                    "transition-transform",
                    isLangOpen ? "rotate-180" : ""
                  )}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {isLangOpen && (
                <div
                  className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 w-40 z-50"
                  onMouseLeave={() => setIsLangOpen(false)}
                >
                  <button
                    onClick={() => switchLanguage("en")}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                      isEnglishPath && "text-primary"
                    )}
                  >
                    <LanguageFlag language="en" />
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => switchLanguage("fr")}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                      !isEnglishPath && "text-primary"
                    )}
                  >
                    <LanguageFlag language="fr" />
                    <span>Français</span>
                  </button>
                </div>
              )}
            </div>
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2"
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
                <span className="sr-only">
                  {theme === "dark" ? "Mode clair" : "Mode sombre"}
                </span>
              </Button>
            )}
          </div>

          {/* Menu Hamburger Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="md:hidden p-2"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-800 dark:text-white"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-800 dark:text-white"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        <div
          className={cn(
            "md:hidden fixed inset-0 top-[57px] bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out z-20",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="flex flex-col p-6 space-y-6">
            {navLinks.map((link, index) => {
              const currentLink = isEnglishPath ? link.en : link.fr;
              if (currentLink.isDropdown) {
                return (
                  <div key={index} className="space-y-6">
                    <button
                      className={cn(
                        "font-medium text-lg flex items-center justify-between w-full",
                        isCategoryOpen
                          ? "text-primary"
                          : "text-gray-600 dark:text-gray-300"
                      )}
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    >
                      <span>{currentLink.label}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn(
                          "transition-transform",
                          isCategoryOpen ? "rotate-180" : ""
                        )}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {isCategoryOpen && (
                      <div className="pl-4 space-y-6 mt-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            className="flex flex-col items-center gap-2 w-full text-left"
                            onClick={() => handleCategoryClick(cat.id)}
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white dark:border-transparent dark:bg-transparent">
                              <Image
                                src={cat.icon}
                                alt={
                                  isEnglishPath ? cat.label.en : cat.label.fr
                                }
                                width={24}
                                height={24}
                                className={`h-6 w-6 ${cat.color}`}
                              />
                            </div>
                            <div className="text-center">
                              <span className="font-medium text-gray-600 dark:text-gray-300">
                                {isEnglishPath ? cat.label.en : cat.label.fr}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={index}
                  href={currentLink.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "font-medium text-lg",
                    pathname === currentLink.href
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-300"
                  )}
                >
                  {currentLink.label}
                </Link>
              );
            })}

            {/* Sélecteur de langue mobile */}
            <div className="space-y-6">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center justify-between w-full font-medium text-lg text-gray-600 dark:text-gray-300"
              >
                <div className="flex items-center gap-2">
                  <LanguageFlag language={isEnglishPath ? "en" : "fr"} />
                  <span>{isEnglishPath ? "English" : "Français"}</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "transition-transform",
                    isLangOpen ? "rotate-180" : ""
                  )}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {isLangOpen && (
                <div className="pl-4 space-y-4 mt-2">
                  <button
                    className="flex items-center gap-3 w-full text-left"
                    onClick={() => {
                      switchLanguage("fr");
                      handleLinkClick();
                    }}
                  >
                    <LanguageFlag language="fr" />
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      Français
                    </span>
                  </button>
                  <button
                    className="flex items-center gap-3 w-full text-left"
                    onClick={() => {
                      switchLanguage("en");
                      handleLinkClick();
                    }}
                  >
                    <LanguageFlag language="en" />
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      English
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Bouton de thème mobile */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-2 font-medium text-lg text-gray-600 dark:text-gray-300"
              >
                {theme === "dark" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                    <span>Mode clair</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                    <span>Mode sombre</span>
                  </>
                )}
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay pour la grille qui apparaît en dessous de la navbar */}
      <div className="absolute inset-0 -z-10 grid-background dark:opacity-25 opacity-20"></div>
    </header>
  );
}

// La fonction switchLanguage est déjà définie et utilisée à l'intérieur du composant
