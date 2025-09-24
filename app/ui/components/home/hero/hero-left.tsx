"use client";

import Link from "next/link";
import { MoveRight } from 'lucide-react';
// import Logo from "@/app/ui/Logo";




const LeftHero = () => {


    return (
        <div className=" h-full w-full mx-auto  px-6 pt-12">
            <div className="flex  items-center h-full">

                <div>
                    <h1 className="text-3xl sm:text-[2.5rem] lg:text-[3rem] xl:text-[4.1rem] font-bold mb-4 leading-tight">
                        <span className="text-text pompiere-regular">LitKenya </span> -
                        <span className="text-normalText">Smart picks for Every Book Enthusiasts </span>

                    </h1>

                    <p className="text-normalText mb-4 text-lg leading-relaxed">
                        Discover, Explore, and Enjoy Personalized Book Recommendations
                        <br />
                        Curated for Kenyan Readers.
                    </p>

                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        What can we help you with?
                    </h2>

                    <div>
                  
                    <Link className="btn hover:cursor-pointer flex flex-nowrap items-center justify-center w-1/3 gap-2" href='/explore'> 
                    <button
                    id="get-help-now-btn"
                    className='flex flex-nowrap'
                    type="button"
                    
                    aria-label='Get started'
                    aria-pressed='false'>
                        Get Started 
                        </button>
                         <MoveRight /> 
                          </Link>
                    
               
            
                    </div>

                </div>
               
            </div>
        </div>
    );
};

export default LeftHero;