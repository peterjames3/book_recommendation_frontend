import BookImage from './books-theme';
export default function RelaxingMood() {
    return (
        <section className='px-5 py-5 rounded-lg bg-accent2 space-y-6'>
            
            <div className='space-y-4'>
                <h3 className='title text-text'>Personalized picks based on your Mood: Adventurous</h3>
                <div className="grid grid-cols-5 gap-4">
                    <BookImage
                        src="/The Darkest minds.png"
                        alt="The Darkest Minds book by Alexandra Bracken"
                        rounded="rounded-tl-[100px]"
                    />
                    <BookImage
                        src="/The Maze Runner.png"
                        alt="The Maze Runner book by James Dashner"
                        rounded="rounded-br-[100px]"
                    />
                    <BookImage
                        src="/Secret.png"
                        alt=" The girl with all the gifts book by M.R. Carey"
                        rounded="rounded-br-[100px]"
                    />

                    <BookImage
                        src="/The 5 wave.png"
                        alt=" The 5th Wave book by Rick Yancey"
                        rounded="rounded-br-[100px]"
                    />
                      <BookImage
                        src="/enclave.png"
                        alt=" the ashes theology book by John Piper"
                        rounded="rounded-br-[100px]"
                    />
                </div>
            </div>
             <div className='space-y-4'>
                <h3 className='title text-text'>Personalized picks based on your Mood : Relaxing</h3>
                <div className="grid grid-cols-5 gap-4">
                    <BookImage
                        src="/little Paris.png"
                        alt="Little Paris book by Kelly Bowen"
                        rounded="rounded-tl-[100px]"
                    />
                    <BookImage
                        src="/The Flat Share.png"
                        alt="The Flat Share book by Beth O'Leary"
                        rounded="rounded-br-[100px]"
                    />
                    <BookImage
                        src="/Anne of Green Gables.png"
                        alt="Anne of Green Gables book by L.M. Montgomery"
                        rounded="rounded-br-[100px]"
                    />

                    <BookImage
                        src="/A man Called Ove.png"
                        alt="A Man Called Ove book by Fredrik Backman"
                        rounded="rounded-br-[100px]"
                    />
                     <BookImage
                        src="/The house in the Gerulean Sea.png"
                        alt=" The house in the Gerulean Sea book by TJ Klune"
                        rounded="rounded-br-[100px]"
                    />
                </div>
            </div>

        </section>
    )
}