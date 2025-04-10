"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NewsletterFormProps {
  className?: string;
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
  const pathname = usePathname();
  const isEnglishPath = pathname.startsWith("/en");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    // Simuler l'envoi de l'email
    try {
      setStatus("loading");

      // Ici, on simulerait l'envoi à une API
      // const response = await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });

      // Simulation d'une attente (à remplacer par votre vrai appel API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulation de succès
      setStatus("success");
      setMessage(
        isEnglishPath
          ? "Thank you for subscribing to our newsletter!"
          : "Merci de vous être inscrit à notre newsletter !"
      );
      setEmail("");

      // En cas d'utilisation réelle, vous traiteriez la réponse ici
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
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isEnglishPath ? "Your email" : "Votre email"}
            required
            disabled={status === "loading"}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-5 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center"
          >
            {status === "loading" ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : null}
            {isEnglishPath ? "Subscribe" : "S'abonner"}
          </button>
        </div>

        {status === "success" && (
          <p className="text-sm text-green-600 dark:text-green-400">
            {message}
          </p>
        )}

        {status === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400">
          {isEnglishPath
            ? "By subscribing, you agree to receive updates from Acelest Blog."
            : "En vous inscrivant, vous acceptez de recevoir des mises à jour du Blog Acelest."}
        </p>
      </form>
    </div>
  );
}
