'use client';
import Image from "next/image";
export default function AboutLitKenya() {
    return(
        <section className=" pt-[8rem] py-12 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px] flex  flex-col gap-10 lg:flex-row  md:justify-between">
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-10'>
                <article className='space-y-2'>
                    <h2 className='headline'>Deciding what to read next</h2>
                    <p className='p-text'>You’re in the right place. Tell us what titles or genres you’ve enjoyed  in the past, and we’ll give you surprisingly insightful recommendations.</p>
                </article>
                <article className="space-y-2">
                    <h2 className='headline'>What are your friends reading</h2>
                    <p className='p-text'>Chances are your friends are discussing their favorite (and least favorite) books on litKenya.</p>
                </article>
                <article>
                    <figure>
                        <Image
                        src='/cuate.png'
                        alt='A group of people reading books'
                        width={300}
                        height={200}
                        className='w-full h-full object-fit rounded-lg'
                         />
                    </figure>
                </article>
            </div>

        </section>

    )
}