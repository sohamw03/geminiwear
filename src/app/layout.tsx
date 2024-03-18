import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { GlobalContextProvider } from "@/contextWithDrivers/GlobalContext";
import { Toaster } from "@/shadcn/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

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
          <NextTopLoader color="white" initialPosition={0.4} crawlSpeed={0} height={3} showSpinner={false} easing="ease-in" speed={400} />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </GlobalContextProvider>
  );
}
