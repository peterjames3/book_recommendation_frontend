"use client";

import StudentImage from "./books-images";
import { FileText, UsersRound } from "lucide-react";
import { AnimatedStatsCard } from "@/app/ui/components/animation/animated-stats-card";

export default function RightHero() {
  return (
    <div className="h-full px-4 pt-12 relative">
      <div className="grid grid-cols-2 grid-rows-2 gap-5">
        <StudentImage
          src="/atomic-habit.jpg"
          alt="atomic habit book by James Clear"
          rounded="rounded-tl-[100px]"
        />
           <StudentImage
          src="/Thinking-in-Bets-Annie-Duke-Cover.webp"
          alt=" Thinking in Bets book by Annie Duke"
          rounded="rounded-br-[100px]"
        />
           <StudentImage
          src="/l2.webp"
          alt=" The Lean Startup book by Eric Ries"
          rounded="rounded-br-[100px]"
        />
        
        <StudentImage
          src="/psychology-of-money.webp"
          alt=" Thinking in Bets book by Annie Duke"
          rounded="rounded-br-[100px]"
        />
      </div>

      <AnimatedStatsCard
        icon={FileText}
        value="1500+"
        label="Books Reviewed"
        position="top-right"
      />

      <AnimatedStatsCard
        icon={UsersRound}
        value="2000+"
        label=" Active members"
        position="bottom-left"
      />
    </div>
  );
}