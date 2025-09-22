"use client";
import { useState, useEffect } from "react";
//import { usePathname } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import Mobile from "@/app/ui/components/navigation/Mobile";

export default function Navbar() {
 // const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  //const [activeMenu, setActiveMenu] = useState<string | null>(null);



  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6 ${
        isScrolled
          ? "bg-gradient-to-r from-white/90 via-green-50/80 to-white/90 backdrop-blur-lg shadow-xl border-b border-white/20"
          : "bg-gradient-to-r from-[#CEF3D6] to-[#FFEEEB]"
      }`}
    >
    
      <div className="w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px] flex items-center justify-between gap-6 px-4 md:px-2 lg:px-3">
        {/* Logo */}
        <nav className="font-bold text-[1.2rem] lg:text-[1.5rem]">
          <Link href="/" className="flex items-center gap-1 lg:gap-2">
            <Image
              src="/favicon-32x32.png"
              alt="TestHelpNow logo"
              height={30}
              width={30}
              priority
              className="object-contain"
            />
            <span>
              <span className="text-foreground">TestHelp</span>
              <span className="text-primary">Now</span>.
            </span>
          </Link>
        </nav>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
         
        </div>
        {/*  Buttons */}
        <div className="lg:flex  hidden gap-5">
         
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <Mobile />
        </div>
      </div>
    </header>
  );
}