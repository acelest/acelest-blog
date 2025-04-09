import React from "react";

interface LanguageFlagProps {
  language: "en" | "fr";
  className?: string;
}

export const LanguageFlag: React.FC<LanguageFlagProps> = ({
  language,
  className = "",
}) => {
  // Simple emoji flag based on language
  return <span className={className}>{language === "en" ? "🇬🇧" : "🇫🇷"}</span>;
};

export default LanguageFlag;
