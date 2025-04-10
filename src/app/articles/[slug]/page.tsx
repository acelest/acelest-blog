// import NavBar from "@/components/NavBar";
// import { generateMetadata } from "@/lib/metadata";
// import { getArticleMetadata, getArticleOgImage } from "@/lib/og";
// import { Metadata } from "next";

// // Générer les métadonnées dynamiquement pour chaque article
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   try {
//     // Récupérer les données de l'article
//     const article = await getArticleMetadata(params.slug);

//     // Récupérer l'URL de l'image Open Graph
//     const ogImage = getArticleOgImage({
//       title: article.title,
//       category: article.category,
//       author: article.author,
//       slug: params.slug,
//     });

//     // Générer les métadonnées
//     return generateMetadata({
//       title: article.title,
//       description: article.description,
//       keywords: article.keywords,
//       image: article.image || ogImage,
//       pathname: `/articles/${params.slug}`,
//       locale: "fr",
//       type: "article",
//     });
//   } catch (error) {
//     // En cas d'erreur, retourner des métadonnées par défaut
//     return generateMetadata({
//       title: "Article",
//       pathname: `/articles/${params.slug}`,
//       locale: "fr",
//     });
//   }
// }

// export default async function ArticlePage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   try {
//     // Récupérer les données de l'article pour l'affichage
//     const article = await getArticleMetadata(params.slug);

//     return (
//       <main className="flex min-h-screen flex-col items-center">
//         <NavBar />
//         <article className="container mx-auto px-4 py-16 max-w-3xl">
//           <header className="mb-8">
//             <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               {article.date} • {article.category}
//             </p>
//           </header>

//           <div className="prose dark:prose-invert max-w-none">
//             {/* Ici, vous afficheriez le contenu réel de l'article */}
//             <p>{article.description}</p>
//             <p>Le contenu complet de l'article sera affiché ici.</p>
//           </div>
//         </article>
//       </main>
//     );
//   } catch (error) {
//     return (
//       <main className="flex min-h-screen flex-col items-center">
//         <NavBar />
//         <div className="container mx-auto px-4 py-16 text-center">
//           <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
//           <p>Désolé, l'article que vous cherchez n'existe pas.</p>
//         </div>
//       </main>
//     );
//   }
// }
