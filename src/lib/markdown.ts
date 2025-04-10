import { marked, MarkedOptions } from "marked";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

/**
 * Convertit du Markdown en HTML avec coloration syntaxique avancée
 * en utilisant unified, remark et rehype
 */
export async function markdownToHtmlAdvanced(
  markdown: string
): Promise<string> {
  const result = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST
    .use(rehypeRaw) // Parse HTML in markdown
    .use(rehypeHighlight) // Syntax highlighting
    .use(rehypeStringify) // Convert to HTML string
    .process(markdown);

  return result.toString();
}

// Étendre l'interface MarkedOptions pour inclure les propriétés manquantes
interface ExtendedMarkedOptions extends MarkedOptions {
  headerIds?: boolean;
  mangle?: boolean;
}

/**
 * Version améliorée de markdownToHtml avec meilleur formatage des blocs de code
 */
export function markdownToHtml(markdown: string): string {
  // Configuration de marked pour la coloration syntaxique
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convertit les retours à la ligne en <br>
    headerIds: true, // Générer des IDs pour les titres (utile pour le sommaire)
    mangle: false,
    langPrefix: "language-", // Préfixe pour les classes de langage
    highlight: function (code: string, lang: string | undefined) {
      // Créer une structure pour notre composant CodeBlock côté client
      const encodedCode = encodeURIComponent(code);
      return `
      <div class="code-block-wrapper" data-language="${
        lang || "text"
      }" data-code="${encodedCode}">
        <pre class="language-${lang || "text"}"><code class="language-${
        lang || "text"
      }">${code}</code></pre>
      </div>
      `;
    },
  } as ExtendedMarkedOptions);

  try {
    // Utiliser marked.parse de manière sûre pour éviter l'erreur de type
    const result = marked.parse(markdown);
    // Vérifier si le résultat est une promesse
    if (result instanceof Promise) {
      // Si c'est une promesse (ce qui ne devrait pas arriver avec nos options),
      // utiliser une valeur par défaut
      console.warn("marked.parse returned a Promise unexpectedly");
      return "Processing content...";
    }
    return result;
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return "<p>Error rendering content</p>";
  }
}

/**
 * Génère une table des matières à partir du contenu Markdown
 */
export function generateTableOfContents(
  markdown: string
): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const matches = [...markdown.matchAll(headingRegex)];

  return matches.map((match) => {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");

    return {
      id,
      text,
      level,
    };
  });
}

/**
 * Extrait la durée de lecture estimée à partir du contenu
 */
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}
