import Image from 'next/image';
import { Annoyed } from 'lucide-react';
export default function DiscoverBookMood(){
    return(
       <section className='px-1.5 space-y-12 w-full'>
            <figure className='rounded-sm bg-text w-12 p-2'>
                  <Annoyed className='text-secondary' size={32} />
            </figure>
            <article className='space-y-5'>
                <h2 className='headline text-text '>Discover Books <br></br> by mood </h2>
                <p className='p-text text-normalText'>In the mood for something adventurous, funny, and fast-paced? What about a darker, slower, more emotional read?</p>
                <p className='p-text text-normalText'>Mix and match our comprehensive set of filters to choose your next perfect book.</p>

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
                        <h4 className='title text-text'>Hanzo Peter</h4>
                        <p className='p-text text-text'>Computer Science Student</p>
                    </article>
                </div>
                <p className='p-text text-text'>It&apos;s uncanny how spot on the recommendations are!</p>
            </article>

            
            


        </section>
    )
}