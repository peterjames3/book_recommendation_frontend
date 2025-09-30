"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";


import Link from "next/link";
import Image from "next/image";
import Mobile from "@/app/ui/components/navigation/Mobile";
import { MenuItems } from "@/lib/menuItems";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  //const [activeMenu, setActiveMenu] = useState<string | null>(null);



  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-7 ${isScrolled
          ? "bg-gradient-to-r from-white/90 via-orange-50/80 to-white/90 backdrop-blur-lg shadow-xl border-b border-white/20"
          : "bg-gradient-to-r from-[#E5E3A3] to-[#FFEEEB]"
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
              <span className="text-foreground">lit</span>
              <span className="text-primary">Kenya</span>.
            </span>
          </Link>
        </nav>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-5 text-normal">
          {
            MenuItems.map((item, index) => (
              <ul key={index} className=''>
                <Link
                  href={item.href}
                  className={`hover:text-cardBg transition-colors  ${pathname === item.href ? "text-text font-semibold" : "text-primary "
                    }`}
                >
                  {item.name}

                </Link>


              </ul>
            ))
          }


        </div>
        {/*  Buttons */}
        <div className="lg:flex  hidden gap-5">
          <button
            id="login-btn"
            // onClick={() => dispatch({ type: "SHOW_HELP" })}
            type="button"
            className="bg-primary px-8 text-text hover:text-secondary p-text border border-primary py-2 rounded-sm hover:cursor-pointer hover:bg-button-hover hover:border-button-hover focus:outline-2 focus:outline-offset-2 focus:outline-button-active active:bg-button-active "
            aria-label='Login'
            aria-pressed='false'
          >
            Login
          </button>
          
          <button
            id="register-btn"
            // onClick={() => dispatch({ type: "SHOW_HELP" })}
            type="button"
            className="border border-button-hover px-8 py-3 hover:bg-button-hover hover:text-secondary  rounded-sm  hover:cursor-pointer"
            aria-label='Register'
            aria-pressed='false'
          >
            Register
          </button>

        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <Mobile />
        </div>
      </div>
    </header>
  );
}