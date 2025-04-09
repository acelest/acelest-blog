// "use client";

// import { Button } from "@/components/ui/button";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// export default function NewsletterForm() {
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState<
//     "idle" | "loading" | "success" | "error"
//   >("idle");
//   const [message, setMessage] = useState("");
//   const pathname = usePathname();
//   const currentLang = pathname.startsWith("/fr") ? "fr" : "en";

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("loading");
//     setMessage("");

//     try {
//       const response = await fetch("/api/newsletter", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatus("success");
//         setMessage(
//           currentLang === "fr"
//             ? "Merci pour votre inscription !"
//             : "Thanks for subscribing!"
//         );
//         setEmail("");
//       } else {
//         setStatus("error");
//         setMessage(
//           data.error ||
//             (currentLang === "fr"
//               ? "Une erreur s'est produite. Veuillez réessayer."
//               : "An error occurred. Please try again.")
//         );
//       }
//     } catch (error) {
//       setStatus("error");
//       setMessage(
//         currentLang === "fr"
//           ? "Une erreur s'est produite. Veuillez réessayer."
//           : "An error occurred. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="w-full">
//       <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
//         <div className="relative flex-grow">
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder={
//               currentLang === "fr"
//                 ? "Votre adresse email"
//                 : "Your email address"
//             }
//             required
//             className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
//           />
//         </div>
//         <Button
//           type="submit"
//           disabled={status === "loading"}
//           className="sm:w-auto"
//         >
//           {status === "loading" ? (
//             <>
//               <svg
//                 className="animate-spin -ml-1 mr-2 h-4 w-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               {currentLang === "fr" ? "Envoi..." : "Sending..."}
//             </>
//           ) : currentLang === "fr" ? (
//             "S'abonner"
//           ) : (
//             "Subscribe"
//           )}
//         </Button>
//       </form>

//       {status === "success" || status === "error" ? (
//         <p
//           className={`mt-3 text-sm ${
//             status === "error" ? "text-red-500" : "text-green-500"
//           }`}
//         >
//           {message}
//         </p>
//       ) : null}
//     </div>
//   );
// }
