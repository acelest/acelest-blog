"use client";

import { useEffect } from "react";

interface MarkdownRendererProps {
  contentId: string;
}

export default function MarkdownRenderer({ contentId }: MarkdownRendererProps) {
  // Au montage du composant, transforme les blocs de code
  useEffect(() => {
    const contentElement = document.getElementById(contentId);
    if (!contentElement) return;

    // Sélectionner tous les wrappers de blocs de code
    const codeBlocks = contentElement.querySelectorAll(".code-block-wrapper");

    codeBlocks.forEach((wrapper) => {
      if (!(wrapper instanceof HTMLElement)) return;

      // Récupérer les données du bloc de code
      const language = wrapper.dataset.language || "text";
      const encodedCode = wrapper.dataset.code || "";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const code = decodeURIComponent(encodedCode);

      // Créer l'élément React pour remplacer le bloc de code
      const codeBlockElement = document.createElement("div");

      // Remplacer le wrapper par notre composant (simulé par du HTML ici)
      codeBlockElement.innerHTML = `
        <div class="relative group">
          <div class="absolute top-0 right-0 bg-gray-800 dark:bg-gray-900 rounded-bl-md rounded-tr-md p-2 flex items-center gap-2">
            <div class="text-xs text-gray-400 font-mono">${language}</div>
            <button 
              class="code-copy-btn text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600"
              data-code="${encodedCode}"
            >
              Copier
            </button>
          </div>
          <pre class="language-${language} !mt-0">${wrapper.innerHTML}</pre>
        </div>
      `;

      wrapper.replaceWith(codeBlockElement);
    });

    // Ajouter les event listeners pour les boutons de copie
    document.querySelectorAll(".code-copy-btn").forEach((btn) => {
      btn.addEventListener("click", function (this: HTMLElement) {
        const encodedCode = this.dataset.code || "";
        const code = decodeURIComponent(encodedCode);

        navigator.clipboard
          .writeText(code)
          .then(() => {
            // Changer le texte du bouton temporairement
            const originalText = this.textContent;
            this.textContent = "Copié !";
            this.classList.add("bg-green-700");

            setTimeout(() => {
              this.textContent = originalText;
              this.classList.remove("bg-green-700");
            }, 2000);
          })
          .catch((err) => console.error("Failed to copy code", err));
      });
    });
  }, [contentId]);

  return null; // Ce composant n'affiche rien, il transforme le HTML existant
}
