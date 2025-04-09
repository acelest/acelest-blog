// "use client";
// import { Article } from "@/app/lib/articles";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// interface ArticleCardProps {
//   article: Article;
//   featured?: boolean;
// }

// export default function ArticleCard({
//   article,
//   featured = false,
// }: ArticleCardProps) {
//   const pathname = usePathname();
//   const currentLang = pathname.startsWith("/fr") ? "fr" : "en";

//   // Formater la date selon la langue
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString(currentLang === "fr" ? "fr-FR" : "en-US", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   return (
//     <div
//       className={cn(
//         "group flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-all duration-200",
//         featured && "md:flex-row"
//       )}
//     >
//       <div
//         className={cn(
//           "relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-800",
//           featured && "md:h-auto md:w-1/2"
//         )}
//       >
//         {article.coverImage ? (
//           <Image
//             src={article.coverImage}
//             alt={article.title}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="48"
//               height="48"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1"
//               className="text-gray-400"
//             >
//               <rect width="18" height="18" x="3" y="3" rx="2" />
//               <path d="M3 9h18" />
//               <path d="M9 21V9" />
//             </svg>
//           </div>
//         )}

//         {article.tags && article.tags.length > 0 && (
//           <div className="absolute top-4 left-4 flex flex-wrap gap-2">
//             {article.tags.slice(0, 2).map((tag) => (
//               <span
//                 key={tag}
//                 className="px-2 py-1 text-xs font-medium bg-primary/80 text-white rounded-md"
//               >
//                 {tag}
//               </span>
//             ))}
//             {article.tags.length > 2 && (
//               <span className="px-2 py-1 text-xs font-medium bg-gray-800/80 text-white rounded-md">
//                 +{article.tags.length - 2}
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="flex flex-1 flex-col justify-between p-6">
//         <div className="flex-1">
//           <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
//             <time dateTime={article.date}>{formatDate(article.date)}</time>
//             <span>•</span>
//             <span>{article.readingTime}</span>
//           </div>

//           <Link
//             href={`${currentLang === "fr" ? "/fr" : ""}/articles/${
//               article.slug
//             }`}
//             className="mt-2 block"
//           >
//             <h3 className="text-xl font-semibold leading-tight text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors">
//               {article.title}
//             </h3>
//             <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3">
//               {article.excerpt}
//             </p>
//           </Link>
//         </div>

//         <div className="mt-6">
//           <Link
//             href={`${currentLang === "fr" ? "/fr" : ""}/articles/${
//               article.slug
//             }`}
//             className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
//           >
//             {currentLang === "fr" ? "Lire" : "Read more"}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M5 12h14" />
//               <path d="m12 5 7 7-7 7" />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
