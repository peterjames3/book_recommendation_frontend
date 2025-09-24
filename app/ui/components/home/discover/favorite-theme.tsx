import BookImage from './books-theme';
export default function FavoriteTheme() {
    return (
        <section className='px-5 py-5 rounded-lg bg-accent2 space-y-6'>
            <h2 className='headline text-text'>Discover Books You&apos;ll Love</h2>
            <div className='space-y-4'>
                <h3 className='title text-text'>Personalized picks based on tour favorite themes...</h3>
                <div className="grid grid-cols-5 gap-4">
                    <BookImage
                        src="/the ashes.png"
                        alt="The ASHES THEOLOGY book by John Piper"
                        rounded="rounded-tl-[100px]"
                    />
                    <BookImage
                        src="/WARM BODIES.png"
                        alt="warm bodies book by Isaac Marion"
                        rounded="rounded-br-[100px]"
                    />
                    <BookImage
                        src="/The girl with all the gifts.png"
                        alt=" The girl with all the gifts book by M.R. Carey"
                        rounded="rounded-br-[100px]"
                    />

                    <BookImage
                        src="/the asshes2.png"
                        alt=" the ashes theology book by John Piper"
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
                <h3 className='title text-text'>Personalized picks based on your favorite author...</h3>
                <div className="grid grid-cols-5 gap-4">
                    <BookImage
                        src="/Patient zero.png"
                        alt="Patient Zero book by Jonathan Maberry"
                        rounded="rounded-tl-[100px]"
                    />
                    <BookImage
                        src="/Broken lands.png"
                        alt=" Broken Lands book by Sam Knight"
                        rounded="rounded-br-[100px]"
                    />
                    <BookImage
                        src="/Fire & ash.png"
                        alt="Fire & Ash book by Jonathan Maberry"
                        rounded="rounded-br-[100px]"
                    />

                    <BookImage
                        src="/decay.png"
                        alt=" Thinking in Bets book by Annie Duke"
                        rounded="rounded-br-[100px]"
                    />
                     <BookImage
                        src="/Flesh&bone.png"
                        alt="Flesh & Bone book by Jonathan Maberry"
                        rounded="rounded-br-[100px]"
                    />
                </div>
            </div>

        </section>
    )
}