// lib/config/metadata.ts
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "iMovn - Nâng tầm thương hiệu",
    template: "%s | iMovn",
  },
  description: "Giải pháp digital marketing toàn diện",
  applicationName: "iMovn",
  keywords: ["digital marketing", "thiết kế website", "SEO"],
  creator: "iMovn Team",
  publisher: "iMovn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "iMovn",
    locale: "vi_VN",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/images/placeholder.png`,
        width: 1200,
        height: 630,
        alt: "iMovn OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iMovn - Nâng tầm thương hiệu",
    description: "Giải pháp digital marketing toàn diện",
    images: [`${SITE_URL}/images/placeholder.png`],
  },
};
