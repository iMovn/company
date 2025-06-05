import { Inter, Archivo, Mulish } from "next/font/google";
import "./../styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@components/common/scroll-to-top";
import { cn } from "lib/utils/utils";
import HeaderServer from "@components/common/header/header.server";
import { ThemeProvider } from "./providers/theme";
import { InitIcons } from "@components/ui/LucideIcon";
import { GradientBackground } from "@components/ui/GradientBackground/FourColor";
import FooterServer from "@components/common/footer";
import { defaultMetadata } from "@config/metadata";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const archivoSans = Archivo({
  variable: "--font-archivo-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload if heavily used
});

const mulishSans = Mulish({
  variable: "--font-mulish-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata = defaultMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={cn(inter.variable, archivoSans.variable, mulishSans.variable)}
    >
      <body
        className={cn(
          "font-mulish antialiased",
          "selection:bg-primary/80 selection:text-neutral-50",
          "overflow-x-hidden"
        )}
      >
        <NextTopLoader
          color="linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))"
          height={1.5}
        />
        <ThemeProvider>
          <GradientBackground>
            <InitIcons />
            <div className="relative flex flex-col min-h-screen">
              <HeaderServer />
              {children}
              <FooterServer />
            </div>
            <ScrollToTop />
          </GradientBackground>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
