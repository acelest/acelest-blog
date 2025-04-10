"use client";

import { useEffect, useRef, useState } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Composant pour intégrer une vidéo YouTube de manière optimisée
 * Utilise l'API YouTube iframe et charge la vidéo uniquement lorsqu'elle est visible
 * Utilise youtube-nocookie.com pour une meilleure confidentialité
 */
export default function YouTubeEmbed({
  videoId,
  title = "YouTube video",
  className = "",
  width = 560,
  height = 315,
}: YouTubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Supprime les erreurs liées aux log_event bloqués par les adblockers
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Filtre les erreurs liées aux requêtes youtube bloquées
      const errorString = args.join(" ");
      if (
        errorString.includes("ERR_BLOCKED_BY_CLIENT") &&
        errorString.includes("youtubei/v1/log_event")
      ) {
        return; // Ignore ces erreurs spécifiques
      }
      originalConsoleError(...args);
    };

    // Charge l'API YouTube iframe de façon différée
    const loadYouTubeApi = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    };

    // Observer pour détecter quand la vidéo est visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoaded) {
          loadYouTubeApi();
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      console.error = originalConsoleError; // Restaure la fonction d'origine
    };
  }, [isLoaded, videoId]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-md ${className}`}
    >
      {isLoaded ? (
        <iframe
          width={width}
          height={height}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="w-full aspect-video"
        />
      ) : (
        <div
          className="w-full aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
          style={{ width, height }}
          onClick={() => setIsLoaded(true)}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-8 h-8"
                style={{ marginLeft: "3px" }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Cliquer pour charger la vidéo
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Fonction utilitaire pour extraire l'ID d'une vidéo YouTube à partir d'une URL
export function getYouTubeVideoId(url: string): string | null {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}
