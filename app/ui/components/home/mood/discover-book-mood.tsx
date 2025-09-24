import Image from 'next/image';
import { Sparkles } from 'lucide-react';
export default function DiscoverBookMood(){
    return(
       <section className='px-1.5 space-y-12 w-full'>
            <figure className='rounded-sm bg-text w-12 p-2'>
                  <Sparkles className='text-secondary' size={32} />
            </figure>
            <article className='space-y-5'>
                <h2 className='headline text-text '>Get Smart <br></br> personalized <br></br>recommendations</h2>
                <p className='p-text text-normalText'>Our machine learning AI is like your trusted go-to friend for book recommendations.</p>
                <p className='p-text text-normalText'>It&apos;ll understand your reading preferences and find the best books for you.</p>

            </article>

            <article className='p-4 space-y-2 rounded-md bg-accent3'>
                <div className='flex items-center gap-2'>
                    <figure>
                     <Image
                     src='/image-avatar.png'
                     alt='James profile picture' 
                     width={50}
                     height={50}
                     className='rounded-full object-fit w-full h-full '/>
                    </figure>
                    <article className='space-y-0.5'>
                        <h4 className='title text-text'>James O</h4>
                        <p className='p-text text-text'>Pre-med Student</p>
                    </article>
                </div>
                <p className='p-text text-text'>It&apos;s uncanny how spot on the recommendations are!</p>
            </article>

            
            


        </section>
    )
}