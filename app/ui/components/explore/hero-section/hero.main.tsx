"use client";
import LeftHero from "./hero-left";
import RightHero from "./hero-right";
import FloatingElements from "@/app/ui/components/animation/FloatingElements";
import { Book } from "../../../../../context/books-store";


interface MainHeroProps {
  onSearchResults: (results: Book[]) => void;
}
export default function MainHero({ onSearchResults }: MainHeroProps) {

  return (
    <section id='hero-main' className="bg-primary min-h-screen z-10 relative">
     
        <div className="pt-[8rem] py-12 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px] flex  flex-col gap-10 lg:flex-row  md:justify-between">
          <div className="w-full lg:w-1/2">
              <LeftHero onSearchResults={onSearchResults} />
          </div>
          <div className="w-full lg:w-1/2">
            {" "}
            <RightHero />{" "}
          </div>
        </div>
      

      <FloatingElements />
    </section>
  );
}