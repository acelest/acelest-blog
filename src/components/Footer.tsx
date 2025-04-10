"use client";

import { Github, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Footer() {
  const pathname = usePathname();
  const isEnglishPath = pathname.startsWith("/en");
  const year = new Date().getFullYear();

  // État pour le formulaire de newsletter
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus("loading");

      // Exemple d'appel à une API newsletter
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Subscription failed");

      setStatus("success");
      setMessage(
        isEnglishPath
          ? "Thank you for subscribing!"
          : "Merci pour votre inscription!"
      );
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        isEnglishPath
          ? "An error occurred. Please try again."
          : "Une erreur est survenue. Veuillez réessayer."
      );
    }
  };

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 mt-auto w-full">
      <div className="container mx-auto px-4 py-10">
        {/* Deux colonnes principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Colonne 1 : Logo, description, liens rapides */}
          <div className="flex flex-col space-y-6">
            {/* Logo + description */}
            <div>
              <Link
                href="/"
                className="text-xl font-bold text-gray-800 dark:text-gray-100 hover:opacity-80 transition-opacity"
              >
                Acelest Blog<span className="text-primary">.</span>
              </Link>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                {isEnglishPath
                  ? "Web dev tutorials & articles to level up your skills."
                  : "Tutoriels & articles de développement web pour améliorer vos compétences."}
              </p>
            </div>

            {/* Liens rapides */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                {isEnglishPath ? "Quick Links" : "Liens rapides"}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/articles"
                    className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                  >
                    {isEnglishPath ? "Articles" : "Articles"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tutorials"
                    className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                  >
                    {isEnglishPath ? "Tutorials" : "Tutoriels"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                  >
                    {isEnglishPath ? "About" : "À propos"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Colonne 2 : Newsletter + Social + Theme */}
          <div className="flex flex-col space-y-6">
            {/* Newsletter */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                {isEnglishPath ? "Newsletter" : "Newsletter"}
              </h3>
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-2"
              >
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isEnglishPath ? "Your email" : "Votre email"}
                    required
                    disabled={status === "loading"}
                    className="pr-16 border-gray-200 dark:border-gray-700 bg-transparent focus-visible:ring-1 focus-visible:ring-primary"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    variant="default"
                    disabled={status === "loading"}
                    className="absolute right-1 top-1 h-8 rounded-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {status === "loading" ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isEnglishPath ? (
                      "Join"
                    ) : (
                      "OK"
                    )}
                  </Button>
                </div>
                {status === "success" && (
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {message}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {message}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isEnglishPath
                    ? "Get the latest articles right in your inbox."
                    : "Recevez nos derniers articles directement dans votre boîte mail."}
                </p>
              </form>
            </div>

            {/* Social + Theme */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.youtube.com/@ACELESTDEV"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/acelest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/acelest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Barre du bas : Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-4 md:mb-0">
            © {year} Acelest Blog.{" "}
            {isEnglishPath ? "All rights reserved." : "Tous droits réservés."}
          </p>
          <div className="flex space-x-4 text-xs">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            >
              {isEnglishPath ? "Privacy" : "Confidentialité"}
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            >
              {isEnglishPath ? "Terms" : "Conditions"}
            </Link>
            <Link
              href="/sitemap"
              className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            >
              {isEnglishPath ? "Sitemap" : "Plan du site"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
