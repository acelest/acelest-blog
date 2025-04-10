import { DiscordButton } from "@/components/DiscordButton";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/markdown.css"; // Import du CSS pour les articles Markdown
import "@/styles/prism.css";
import "highlight.js/styles/github-dark.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acelest Blog",
  description: "Blog tech, développement web et astuces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background dark:bg-black text-foreground flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            {children}
            <Footer />
            <DiscordButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
