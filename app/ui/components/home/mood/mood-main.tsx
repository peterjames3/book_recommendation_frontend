import RelaxingMood from "./relaxing-mood";
import DiscoverBook from "./discover-book-mood";
export default function MoodMain(){
    return(
        <section className=''>
            <div className='flex items-center gap-8 lg:gap-16  py-20 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px]   flex-col  lg:flex-row  md:justify-between'>
                 <div className=' w-full md:w-[20%]'>
                <DiscoverBook />
                </div>
                <div className='w-full md:w-[80%]'>
                <RelaxingMood />
                </div>
               
            </div>

        </section>
    )
}