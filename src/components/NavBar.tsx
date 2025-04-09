"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const router = useRouter();

  // Définir les langues disponibles
  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  // Fonction pour changer de langue
  const switchLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);

    // Redirection vers la même page dans la nouvelle langue
    const newPath = pathname.replace(/^\/(fr|en)/, `/${langCode}`);
    router.push(newPath);
  };

  // Détecter le scroll pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Liens de navigation
  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/articles", label: t("nav.articles") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  // Fermer le menu mobile quand on clique sur un lien
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // État actuel de la langue
  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium text-sm transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions (langue et bouton de newsletter) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Sélecteur de langue desktop */}
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <span>{currentLang.flag}</span>
                <span className="sr-only md:not-sr-only">
                  {currentLang.code.toUpperCase()}
                </span>
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2",
                      i18n.language === lang.code &&
                        "bg-gray-100 dark:bg-gray-700"
                    )}
                  >
                    <span>{lang.flag}</span> {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton Newsletter */}
            <Button>
              Newsletter
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
            </Button>
          </div>

          {/* Menu Hamburger pour Mobile */}
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "font-medium text-lg",
                  pathname === link.href
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Sélecteur de langue mobile */}
            <div className="border-t pt-4 mt-2">
              <p className="text-sm text-gray-500 mb-3">{t("nav.language")}</p>
              <div className="flex flex-col space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      switchLanguage(lang.code);
                      handleLinkClick();
                    }}
                    className={cn(
                      "px-2 py-2 rounded-md text-sm flex items-center gap-2",
                      i18n.language === lang.code
                        ? "bg-gray-100 dark:bg-gray-800"
                        : ""
                    )}
                  >
                    <span>{lang.flag}</span> {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton Newsletter (mobile) */}
            <div className="pt-2">
              <Button className="w-full justify-center">
                Newsletter
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
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
