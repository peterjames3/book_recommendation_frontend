"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/context/auth-store";
import GuestNavbar from "./guest-navbar";
import UserNavbar from "@/app/ui/components/dashboard/navbar";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-7 ${
    isScrolled
      ? "bg-gradient-to-r from-white/90 via-orange-50/80 to-white/90 backdrop-blur-lg shadow-xl border-b border-white/20"
      : "bg-gradient-to-r from-[#E5E3A3] to-[#FFEEEB]"
  }`;

  return (
    <header className={headerClasses}>
      {isAuthenticated && user ? (
        <UserNavbar />
      ) : (
        <GuestNavbar />
      )}
    </header>
  );
}