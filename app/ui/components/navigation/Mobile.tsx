"use client";
import { useState } from "react";
//import Link from "next/link";
//import { usePathname } from "next/navigation";
import { X, AlignJustify,  } from "lucide-react";
//import clsx from "clsx";
//import { MenuItems } from "@/lib/menuitem";
import { motion, AnimatePresence } from "framer-motion";

export default function Mobile() {
  const [isOpen, setIsOpen] = useState(false);
  //const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  //const pathname = usePathname();

//   useEffect(() => {
//     if (!isOpen) {
//       setOpenSubmenus({});
//     }
//   }, [isOpen]);

//   const toggleSubmenu = (name: string) => {
//     setOpenSubmenus((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

  // Variants for animations
  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        delay: 0.15,
      },
    },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

//   const submenuVariants = {
//     open: {
//       height: "auto",
//       opacity: 1,
//       transition: {
//         type: "spring" as const,
//         stiffness: 100,
//         damping: 25,
//       },
//     },
//     closed: {
//       height: 0,
//       opacity: 0,
//       transition: {
//         type: "spring" as const,
//         stiffness: 120,
//         damping: 25,
//         delay: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3 },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//     },
//   };

  return (
    <div>
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        title={isOpen ? "Close menu" : "Open menu"}
        className="hover:cursor-pointer transition-all delay-300 bg-foreground/20 p-2 rounded-full"
      >
        {isOpen ? <X /> : <AlignJustify />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 z-40 h-full"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed min-h-screen top-0 right-0 bottom-0 w-3/4 bg-gradient-to-b from-[#CEF3D6] to-[#FFEEEB] z-100 overflow-y-auto shadow-xl"
          >
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}