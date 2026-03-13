import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description: `Portfolio of ${siteConfig.name} - ${siteConfig.bio}`,
  keywords: [siteConfig.name, "Software Developer", "AI Engineer", "Next.js", "TypeScript", "TailwindCSS", "Web Development", "Frontend Developer", "Full Stack", "Portfolio"],
  authors: [{ name: siteConfig.name }],
  icons: {
    icon: siteConfig.avatarUrl,
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: "Portfolio showcasing projects, skills, and live GitHub activity",
    url: siteConfig.siteUrl,
    siteName: `${siteConfig.name} Portfolio`,
    type: "website",
    images: [
      {
        url: siteConfig.avatarUrl,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: "Portfolio showcasing projects, skills, and live GitHub activity",
    images: [siteConfig.avatarUrl],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
