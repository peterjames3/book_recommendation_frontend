import { Book } from "@/context/books-store";
import Image from "next/image";

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {
    return (
        <article className=" flex flex-col items-start text-start cursor-pointer">
            <figure>
                <Image
                    src={book.imageUrl || '/placeholder.jpg'}
                    width={280}
                    height={400}
                    alt={book.title}
                    className="w-[16rem] h-[23rem] object-fit rounded-r-xl mb-3 shadow"
                />
            </figure>
            <section>
                <h3 className="font-semibold title line-clamp-2">{book.title}</h3>


                <p className="text-[0.9rem] text-text mb-1">
                    {book.authors?.join(", ") || "Unknown Author"}
                </p>


                <div className='flex items-center gap-2'>
                    <header className='flex items-center'>
                        <h4><span className='p-text font-semibold'>Rating:</span> <span>{book.rating}</span> </h4>

                    </header>

                    <span className="p-text text-button-active">(
                        {book.ratingsCount || "Unknown Genre"})
                    </span>
                </div>

            </section>
        </article>
    );
}
