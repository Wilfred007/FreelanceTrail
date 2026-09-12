import type { Metadata } from "next";
import { Hanken_Grotesk, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "@/components/nav";
import { NetworkBanner } from "@/components/network-banner";
import { Toaster } from "@/components/ui/sonner";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreelanceTrail",
  description: "Verifiable freelance work, contributions, and payments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground">
        <Providers>
          <Nav />
          <NetworkBanner />
          <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8">{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
