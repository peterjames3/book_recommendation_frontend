"use client";
import LeftHero from "./hero-left";
import RightHero from "./hero-right";
import FloatingElements from "@/app/ui/components/animation/FloatingElements";
//import { motion, AnimatePresence } from "framer-motion";
// import MultiStepForm from "@/app/ui/components/form/MultiStepForm";
// import { useUIState, useUIDispatch } from "@/context/UIContext";
export default function MainHero() {
//   const { isVisible } = useUIState();
//   const dispatch = useUIDispatch();
  return (
    <section id='hero-main' className="bg-primary max-h-screen z-10 relative">
     
        <div className="pt-[8rem] py-12 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px] flex  flex-col gap-10 lg:flex-row  md:justify-between">
          <div className="w-full lg:w-1/2">
            <LeftHero />
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