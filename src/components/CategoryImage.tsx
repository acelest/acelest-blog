"use client";

import Image from "next/image";
import { useState } from "react";

interface CategoryImageProps {
  categoryName: string;
  categoryIcon: string;
}

export function CategoryImage({
  categoryName,
  categoryIcon,
}: CategoryImageProps) {
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);

  return (
    <Image
      src={fallbackSrc || categoryIcon}
      alt={categoryName}
      width={24}
      height={24}
      className="h-6 w-6"
      onError={() => {
        setFallbackSrc("/file.svg");
      }}
    />
  );
}
