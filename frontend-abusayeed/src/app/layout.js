import {
  Poppins,
  Roboto,
  Lobster,
  Caveat,
  Work_Sans,
  Outfit,
  Hind_Siliguri,
} from "next/font/google";
import "./globals.css";
import Navbar from "../components/sheard/Navbar";
import Footer from "@/components/sheard/Footer";
import TopHeader from "@/components/sheard/TopHeader";
import Preloader from "@/components/sheard/Preloader";

import ReduxProviderWrapper from "@/components/ReduxProvaiderWrapper";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

import { Toaster } from "react-hot-toast";

// Google Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});
const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lobster",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
});
const worksans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-work",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});
// Hind Siliguri for Bengali text
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata = {
  title: {
    template: "Abu Sayeed | %s",
    default: "Abu Sayeed | Home",
  },
  description:
    "Abu Sayeed - A premium IT training and creative platform dedicated to empowering individuals with industry-leading skills in design, development, and digital arts.",
  icons: {
    icon: "/images/ejobsitlogo.png",
    shortcut: "/images/ejobsitlogo.png",
    apple: "/images/ejobsitlogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable} ${lobster.variable} ${caveat.variable} ${worksans.variable} ${outfit.variable} ${hindSiliguri.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <Preloader />
        <ReduxProviderWrapper>
          <LanguageProvider>
            <ThemeProvider>
              <Toaster position="top-center" reverseOrder={false} />

              {children}
            </ThemeProvider>
          </LanguageProvider>
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
