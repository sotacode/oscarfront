import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";

import seoConfig from "@/config/seo";

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: `${seoConfig.businessName} | Mobile Car Mechanic Auckland`,
    template: `%s | ${seoConfig.businessName}`,
  },
  description: seoConfig.businessDescription,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.author }],
  creator: seoConfig.businessName,
  publisher: seoConfig.businessName,

  // Open Graph
  openGraph: {
    type: 'website',
    locale: seoConfig.locale,
    url: seoConfig.siteUrl,
    title: `${seoConfig.businessName} | Mobile Car Mechanic Auckland`,
    description: seoConfig.businessDescription,
    siteName: seoConfig.businessName,
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${seoConfig.businessName} - Mobile Mechanic Service`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: `${seoConfig.businessName} | Mobile Car Mechanic Auckland`,
    description: seoConfig.businessDescription,
    images: [seoConfig.ogImage],
  },

  // Icons
  icons: {
    icon: "/iconwebpage.ico",
    shortcut: "/iconwebpage.png",
    apple: "/iconwebpage.png",
  },

  // Verification (add your verification codes when available)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional metadata
  category: 'Automotive Services',
};

// Viewport configuration (separate export in Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NZ" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={seoConfig.siteUrl} />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ forcedTheme: "light" }}>
          <div className="h-screen w-full">
            <main className="w-full max-w-none"> {/* Remove container and disable max-width */}
              {children}
            </main>
            <footer className="w-full flex items-center justify-center">
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}