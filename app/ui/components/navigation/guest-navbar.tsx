"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Mobile from "@/app/ui/components/navigation/Mobile";
import { MenuItems } from "@/lib/menuItems";

// interface GuestNavbarProps {
//   isScrolled: boolean;
// }

export default function GuestNavbar() {
  const pathname = usePathname();

  return (
    <div className="w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px] flex items-center justify-between gap-6 px-4 md:px-2 lg:px-3">
      {/* Logo */}
      <nav className="font-bold text-[1.2rem] lg:text-[1.5rem]">
        <Link href="/" className="flex items-center gap-1 lg:gap-2">
          <Image
            src="/favicon-32x32.png"
            alt="LitKenya logo"
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
        {MenuItems.map((item, index) => (
          <ul key={index}>
            <Link
              href={item.href}
              className={`hover:text-cardBg transition-colors ${
                pathname === item.href 
                  ? "text-text font-semibold" 
                  : "text-primary"
              }`}
            >
              {item.name}
            </Link>
          </ul>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="hidden lg:flex gap-5">
        <Link
          href="/login"
          id="login-btn"
          type="button"
          className="bg-primary flex items-center justify-center px-8 text-text hover:text-secondary p-text border border-primary py-2 rounded-sm hover:cursor-pointer hover:bg-button-hover hover:border-button-hover focus:outline-2 focus:outline-offset-2 focus:outline-button-active active:bg-button-active"
          aria-label="Login"
          aria-pressed="false"
        >
          Login
        </Link>
        
        <Link
          href="/register"
          id="register-btn"
          type="button"
          className="border border-button-hover px-8 py-3 hover:bg-button-hover hover:text-secondary rounded-sm hover:cursor-pointer"
          aria-label="Register"
          aria-pressed="false"
        >
          Register
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="flex lg:hidden">
        <Mobile />
      </div>
    </div>
  );
}