import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/app/ui/components/navigation/Navbar";
import Footer from "./ui/components/footer/footer";
import ScrollToTopBtn from "./ui/scroll-to-top-btn";
import ReactQueryProvider from "@/provider/react-query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "litKenya| Personalized Book Discovery",
    template: "%s | litKenya",
  },
  description:
    "litKenya helps you discover personalized book recommendations based on your reading preferences. Find your next favorite book with our AI-powered recommendation engine and community reviews..",
   keywords: [
    "book recommendations",
    "reading suggestions",
    "book discovery",
    "personalized reading",
    "book community",
    "what to read next",
    "book finder",
    "reading app",
    "book suggestions",
    "literary recommendations",
    "book matching",
    "reading preferences",
    "book catalog",
    "reader community",
    "book reviews",
    "reading lists",
    "book genres",
    "new book discoveries",
    "reading algorithm",
    "book lover app",
  ],

  robots: "index, follow",
  openGraph: {
    title:{
      default: "litKenya | Discover Your Next Favorite Read",
      template: "%s | litKenya",
    } ,
    description:
      "Find your perfect next book with BookWise's intelligent recommendation system. Get personalized suggestions based on your favorite genres, authors, and reading history.",
    url: "https://litKenya.com/",
    type: "website",
    locale: "en_US",
    siteName: "litKenya",
  },
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
      
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
        >
         
         <Navbar />
          {children}
           <ScrollToTopBtn />
           <Footer /> 
            <ToastContainer />
          
        </body>
        </ReactQueryProvider>
      
    </html>
  );
}