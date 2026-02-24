import type { Metadata } from "next";
import { Sora, Geist_Mono, Archivo_Black } from "next/font/google";
import "./globals.css";
import { SplineLoadingProvider } from "@/components/SplineLoadingContext";
import LoadingScreen from "@/components/LoadingScreen";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sky Alliance - Beyond the Sky",
  description:
    "Your journey to success starts here. Strategic partnership consultancy helping ambitious businesses transform for growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${geistMono.variable} ${archivoBlack.variable} antialiased`}>
        <SplineLoadingProvider>
          <LoadingScreen>
            {children}
          </LoadingScreen>
        </SplineLoadingProvider>
      </body>
    </html>
  );
}
