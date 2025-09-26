"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type Testimonial = {
  name: string;
  location: string;
  date: string;
  rating: number;
  content: string;
};

type Props = {
  testimonials: Testimonial[];
  direction?: "left" | "right";
};

export default function TestimonialScroller({
  testimonials,
  direction = "left",
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  // Duplicate testimonials to fill space — better looping illusion
  const repeatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    if (scrollRef.current) {
      setScrollWidth(scrollRef.current.scrollWidth / 2);
      // divide by 2 since we duplicated
    }
  }, [testimonials]);

  // Animate dynamically based on scrollWidth
  const animation = {
    x: direction === "left" ? [0, -scrollWidth] : [-scrollWidth, 0],
    transition: {
      ease: "linear" as const,
      duration: 40,
      repeat: Infinity,
    },
  };

  return (
    <div className="overflow-hidden relative group">
      <motion.div
        animate={animation}
        onHoverStart={(e) => (
          e.stopPropagation(),
          scrollRef.current?.classList.add("paused")
        )}
        onHoverEnd={(e) => (
          e.stopPropagation(),
          scrollRef.current?.classList.remove("paused")
        )}
        ref={scrollRef}
        className="flex w-fit gap-6"
      >
        {repeatedTestimonials.map((t, index) => (
          <div
            key={index}
            className="min-w-[280px] md:min-w-[320px] max-w-sm bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.date}</span>
            </div>
            <div className="text-sm text-gray-500 mb-1">from {t.location}</div>
            <div className="text-yellow-500 text-sm mb-2">
              {"★".repeat(t.rating)}
              {"☆".repeat(5 - t.rating)}
            </div>
            <p className="text-sm text-gray-700">{t.content}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}