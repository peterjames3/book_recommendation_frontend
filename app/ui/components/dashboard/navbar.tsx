"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Mobile from "@/app/ui/components/navigation/Mobile";
import { MenuItems } from "@/lib/dashboard-menu-items";
import { useAuthStore } from "@/context/auth-store";
import UserDetails from "./user-details";

// interface UserNavbarProps {
//   isScrolled: boolean;
// }

export default function UserNavbar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

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

      {/* User Profile */}
      <div className="hidden lg:flex gap-5">
        <UserDetails user={user} />
      </div>

      {/* Mobile Menu */}
      <div className="flex lg:hidden">
        <Mobile />
      </div>
    </div>
  );
}