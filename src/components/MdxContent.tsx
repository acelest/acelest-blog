"use client";

import { useEffect } from "react";

interface MdxContentProps {
  source: string;
}

// Composant MdxContent qui intègre la coloration syntaxique
export default function MdxContent({ source }: MdxContentProps) {
  useEffect(() => {
    // Charger Prism.js pour la coloration syntaxique côté client
    import("prismjs").then((Prism) => {
      // Langages à charger (ajoutez ceux dont vous avez besoin)
      import("prismjs/components/prism-javascript");
      import("prismjs/components/prism-typescript");
      import("prismjs/components/prism-css");
      import("prismjs/components/prism-jsx");
      import("prismjs/components/prism-tsx");
      import("prismjs/components/prism-bash");
      import("prismjs/components/prism-python");

      // Mettre à jour la coloration syntaxique
      Prism.highlightAll();
    });
  }, [source]);

  return <div dangerouslySetInnerHTML={{ __html: source }} />;
}
