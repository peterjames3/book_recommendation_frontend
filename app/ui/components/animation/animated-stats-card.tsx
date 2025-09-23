"use client";

import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface AnimatedStatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  position?: "top-right" | "bottom-left";
}

export const AnimatedStatsCard = ({
  icon: Icon,
  value,
  label,
  position = "top-right",
}: AnimatedStatsCardProps) => {
  return (
    <motion.div
      className={`absolute ${
        position === "top-right" ? "top-8 right-3" : "bottom-8 left-3"
      } max-w-4xl bg-accent2 flex items-center gap-2 py-2 px-3 rounded-2xl shadow-md`}
      initial={{ opacity: 0, x: position === "top-right" ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      }}
    >
      <figcaption>
        <Icon size={46} className="text-normalText font-semibold" />
      </figcaption>
      <article className="space-y-1">
        <motion.h4
          className="text-[1.5rem] text-normalText font-semibold"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {value}
        </motion.h4>
        <motion.p
          className="label-text text-text"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {label}
        </motion.p>
      </article>
    </motion.div>
  );
};