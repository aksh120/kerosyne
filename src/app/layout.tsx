import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";

import CustomCursor from "@/components/common/CustomCursor";
import Preloader from "@/components/common/Preloader";

export const metadata: Metadata = {
  title: "KEROSYNE / SHOP",
  description: "Curated drip for the next-gen fashion",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} min-h-screen flex flex-col`}>
        <Preloader />
        <HolyLoader color="#868686" />
        <CustomCursor />
        <TopBanner />
        <Providers>
          <TopNavbar />
          <main className="flex-1">
            {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
