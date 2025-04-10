"use client";

import { generateTableOfContents } from "@/lib/markdown";
import { useEffect, useState } from "react";

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export default function TableOfContents({
  content,
  className = "",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const toc = generateTableOfContents(content);

  // Observer pour la section active pendant le défilement
  useEffect(() => {
    const headingElements = toc.map((heading) =>
      document.getElementById(heading.id)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    headingElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      headingElements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className={`p-4 bg-gray-50 dark:bg-gray-900 rounded-lg ${className}`}>
      <h3 className="text-md font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Table des matières
      </h3>
      <nav>
        <ul className="space-y-1 text-sm">
          {toc.map(({ id, text, level }) => (
            <li
              key={id}
              className={`${level > 1 ? `pl-${(level - 1) * 3}` : ""}`}
            >
              <a
                href={`#${id}`}
                className={`
                  block py-1 hover:text-primary transition-colors 
                  ${
                    activeId === id
                      ? "text-primary font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }
                `}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
