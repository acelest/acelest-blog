"use client";

import { Github, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isEnglishPath = pathname.startsWith("/en");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="text-xl font-bold text-gray-800 dark:text-gray-100"
            >
              Acelest<span className="text-primary">.</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isEnglishPath
                ? "Web development tutorials and articles"
                : "Tutoriels et articles sur le développement web"}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.youtube.com/@ACELESTDEV"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="https://github.com/acelest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com/acelest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              &copy; {year} Acelest.{" "}
              {isEnglishPath ? "All rights reserved." : "Tous droits réservés."}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
