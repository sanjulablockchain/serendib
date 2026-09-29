import type { Metadata } from "next";
import { Cinzel, Crimson_Pro } from "next/font/google";
import { Atmosphere } from "@/components/layout/Atmosphere";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ParticleField } from "@/components/layout/ParticleField";
import { ScrollFx } from "@/components/layout/ScrollFx";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { site } from "@/content/site";
import "./globals.css";

const body = Crimson_Pro({ variable: "--font-body", subsets: ["latin"] });
const heading = Cinzel({ variable: "--font-heading", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Pediatric Health Plans in Los Angeles`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-(image:--gradient-page) font-sans text-fg">
            <ParticleField />
            <Atmosphere />
            <ScrollProgress />
            <Header />
            <main id="top" className="relative z-[1] flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <ScrollFx />
        </ThemeProvider>
      </body>
    </html>
  );
}
