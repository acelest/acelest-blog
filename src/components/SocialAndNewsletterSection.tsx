"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/**
 * Flexible CTA Section
 * Can be used in various contexts throughout the site
 */

type CtaSectionProps = {
  title?: {
    en: string;
    fr: string;
  };
  description?: {
    en: string;
    fr: string;
  };
  primaryCta?: {
    text: {
      en: string;
      fr: string;
    };
    href: string;
  };
  secondaryCta?: {
    text: {
      en: string;
      fr: string;
    };
    href: string;
  };
  children?: ReactNode;
  layout?: "centered" | "split";
  bgColor?: string;
};

export default function FlexibleCtaSection({
  title = {
    en: "Join our community",
    fr: "",
  },
  description = {
    en: "Join our community and take your skills to the next level.",
    fr: "",
  },

  secondaryCta,
  children,
  layout = "centered",
  bgColor = "bg-transparent",
}: CtaSectionProps) {
  const pathname = usePathname();
  const isEnglishPath = pathname.startsWith("/en");

  const lang = isEnglishPath ? "en" : "fr";

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container px-4 mx-auto">
        {layout === "centered" ? (
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {title[lang]}
            </h2>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
              {description[lang]}
            </p>

            {children && <div className="mb-8">{children}</div>}

            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              ></motion.div>

              {secondaryCta && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={secondaryCta.href}
                    className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium transition duration-200"
                  >
                    {secondaryCta.text[lang]}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                {title[lang]}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {description[lang]}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={primaryCta.href}
                    className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200"
                  >
                    {primaryCta.text[lang]}
                  </Link>
                </motion.div>

                {secondaryCta && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={secondaryCta.href}
                      className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium transition duration-200"
                    >
                      {secondaryCta.text[lang]}
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex justify-center md:justify-end">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}
