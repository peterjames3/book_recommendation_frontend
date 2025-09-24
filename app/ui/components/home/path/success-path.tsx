// components/SuccessPath.tsx
"use client";

import { motion } from "framer-motion";
import SuccessStep from "./success-step";

import {
  Brain,
  BookOpen,
  Annoyed, 
  OctagonAlert,
} from "lucide-react";

const steps = [
  {
    title: "AI-Powered Recommendation",
    description:
      "Our advanced AI analyzes your reading preferences to suggest books you'll love.",
    icon: <Brain className="text-primary w-6 h-6" />,
    bgColor: "bg-red-50",
  },
  {
    title: "Book Clubs",
    description:
      "Coming soon: vote on books, organise meetings, and host compelling discussions.",
    icon: <BookOpen className="text-primary w-6 h-6" />,
    bgColor: "bg-blue-200",
  },
  {
    title: "Content Warnings",
    description:
      "Choose your next read with the confidence that it won't contain triggering content.",
    icon: <OctagonAlert className="text-primary w-6 h-6" />,
    bgColor: "bg-green-100",
  },
  {
    title: "Mood Based Suggestions",
    description:
      "Find books that match your current mood, whether you're looking for something light-hearted or deeply thought-provoking.",
    icon: <Annoyed  className="text-primary w-6 h-6" />,
    bgColor: "#F5F5DC",
  },
];

export default function SuccessPath() {
  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px]  flex flex-col text-center justify-center sm:flex-row sm:text-start lg:items-center sm:justify-between mb-10 px-9">
        <h2 className="text-4xl font-bold text-primary mb-2">
          Why Choose <br /> LitKenya
        </h2>
        <p className="text-primary p-text">
          Discover your next favorite book with our intelligent recommendation system and  <br /> vibrant reading community.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className=" w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px] flex flex-wrap justify-center gap-6"
      >
        {steps.map((step, index) => (
          <SuccessStep key={index} {...step} />
        ))}
      </motion.div>
    </section>
  );
}