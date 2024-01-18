import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { GlobalContextProvider } from "@/contextWithDrivers/GlobalContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/shadcn/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GeminiWear",
  description: "Discover the perfect blend of style and comfort with GeminiWear. Explore our collection of trendy and high-quality clothing for all occasions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <GlobalContextProvider>
      <html lang="en">
        <body className={`${inter.className} bg-[hsl(222.2,84%,4.9%)] min-h-screen flex flex-col`}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </GlobalContextProvider>
  );
}
