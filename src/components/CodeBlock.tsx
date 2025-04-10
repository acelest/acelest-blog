"use client";

import { useEffect, useState } from "react";

interface CodeBlockProps {
  language: string;
  code: string;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      // Réinitialiser après 2 secondes
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  // Charger highlight.js pour la coloration syntaxique
  useEffect(() => {
    // Importer highlight.js seulement côté client
    if (typeof window !== "undefined") {
      import("highlight.js").then((hljs) => {
        hljs.default.highlightAll();
      });
    }
  }, [code]);

  return (
    <div className="relative group">
      <div className="absolute top-0 right-0 bg-gray-800 dark:bg-gray-900 rounded-bl-md rounded-tr-md p-2 flex items-center gap-2">
        <div className="text-xs text-gray-400 font-mono">{language}</div>
        <button
          onClick={copyToClipboard}
          className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600"
        >
          {copied ? "Copié !" : "Copier"}
        </button>
      </div>
      <pre className={`language-${language} !mt-0`}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
